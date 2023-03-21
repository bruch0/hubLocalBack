import { Test } from '@nestjs/testing';
import { INestApplication, MiddlewareConsumer, NestModule, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as faker from 'faker';

import { AppModule } from '../../src/app.module';
import { mainConfig } from '../../src/main.config';

describe('Company Module - E2E', () => {
  let app: INestApplication;
  let nestApp: request.SuperTest<request.Test>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    mainConfig(app);
    await app.init();

    nestApp = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  const generateCreateCompanyDto = () => {
    return {
      name: faker.name.findName(),
      siteUrl: faker.internet.url(),
      taxId: faker.helpers.regexpStyleStringParse(
        '[01-99].[001-999].[001-999]/[0001-9999]-[01-99]',
      ),
    };
  };

  const generateUpdateCompanyDto = (companyId: number) => {
    return {
      id: companyId,
      name: faker.name.findName(),
      siteUrl: faker.internet.url(),
      taxId: faker.helpers.regexpStyleStringParse(
        '[01-99].[001-999].[001-999]/[0001-9999]-[01-99]',
      ),
    };
  };

  const createUser = async () => {
    const createUserDto = {
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: faker.internet.password(),
    };

    await nestApp.post('/users/register').send(createUserDto);
    const response = await nestApp
      .post('/users/login')
      .send({ email: createUserDto.email, password: createUserDto.password });

    return { ...createUserDto, token: response.body.token };
  };

  const getUserCompanies = async () => {
    const createUserDto = {
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: faker.internet.password(),
    };

    await nestApp.post('/users/register').send(createUserDto);
    const response = await nestApp
      .post('/users/login')
      .send({ email: createUserDto.email, password: createUserDto.password });

    const { token } = response.body;
    const createCompanyDto = generateCreateCompanyDto();

    await nestApp
      .post('/companies')
      .set('Authorization', 'Bearer ' + token)
      .send(createCompanyDto);

    const data = await nestApp
      .get('/companies?itemsPerPage=10&pageNumber=1')
      .set('Authorization', 'Bearer ' + token);

    return { company: data.body.companies[0], token };
  };

  describe(`GET /companies`, () => {
    it('Should return status 401 while not sending a valid authToken', async () => {
      await nestApp.get('/companies').expect(401);
      await nestApp.get('/companies').set('Auth', 'Bearer ').expect(401);
      await nestApp.get('/companies').set('Authorization', '').expect(401);
    });

    it('Should return status 200 when sending a valid authToken', async () => {
      const { token } = await createUser();

      await nestApp
        .get('/companies?itemsPerPage=10&pageNumber=1')
        .set('Authorization', 'Bearer ' + token)
        .expect(200);
    });
  });

  describe(`POST /companies`, () => {
    it('Should return status 401 while not sending a valid authToken', async () => {
      await nestApp.post('/companies').expect(401);
      await nestApp.post('/companies').set('Auth', 'Bearer ').expect(401);
      await nestApp.post('/companies').set('Authorization', '').expect(401);
    });

    it('Should return status 201 when sending a valid authToken and valid body', async () => {
      const { token } = await createUser();
      const createCompanyDto = generateCreateCompanyDto();

      await nestApp
        .post('/companies')
        .set('Authorization', 'Bearer ' + token)
        .send(createCompanyDto)
        .expect(201);
    });

    it('Should return status 409 when the taxId is already in use', async () => {
      const { token } = await createUser();
      const createCompanyDto = generateCreateCompanyDto();

      await nestApp
        .post('/companies')
        .set('Authorization', 'Bearer ' + token)
        .send(createCompanyDto);

      await nestApp
        .post('/companies')
        .set('Authorization', 'Bearer ' + token)
        .send(createCompanyDto)
        .expect(409);
    });
  });

  describe(`PUT /companies`, () => {
    it('Should return status 401 while not sending a valid authToken', async () => {
      await nestApp.post('/companies').expect(401);
      await nestApp.post('/companies').set('Auth', 'Bearer ').expect(401);
      await nestApp.post('/companies').set('Authorization', '').expect(401);
    });

    it('Should return status 200 when sending a valid authToken and valid body', async () => {
      const { company, token } = await getUserCompanies();

      const updateCompanyDto = generateUpdateCompanyDto(company.id);

      await nestApp
        .put('/companies')
        .set('Authorization', 'Bearer ' + token)
        .send(updateCompanyDto)
        .expect(200);
    });

    it('Should return status 403 when sending a valid authToken and valid body, but the company does not belong to the user', async () => {
      const { token } = await createUser();
      const { company } = await getUserCompanies();

      const updateCompanyDto = generateUpdateCompanyDto(company.id);

      await nestApp
        .put('/companies')
        .set('Authorization', 'Bearer ' + token)
        .send(updateCompanyDto)
        .expect(403);
    });
  });

  describe(`DELETE /companies`, () => {
    it('Should return status 401 while not sending a valid authToken', async () => {
      await nestApp.delete('/companies/1').expect(401);
      await nestApp.delete('/companies/1').set('Auth', 'Bearer ').expect(401);
      await nestApp.delete('/companies/1').set('Authorization', '').expect(401);
    });

    it('Should return status 200 when sending a valid authToken and valid body', async () => {
      const { company, token } = await getUserCompanies();

      const updateCompanyDto = generateUpdateCompanyDto(company.id);

      await nestApp
        .delete(`/companies/${updateCompanyDto.id}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(200);
    });

    it('Should return status 403 when sending a valid authToken and valid body, but the company does not belong to the user', async () => {
      const { token } = await createUser();
      const { company } = await getUserCompanies();

      const updateCompanyDto = generateUpdateCompanyDto(company.id);

      await nestApp
        .delete(`/companies/${updateCompanyDto.id}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(403);
    });
  });
});
