import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as faker from 'faker';

import { AppModule } from '../../src/app.module';
import { mainConfig } from '../../src/main.config';

describe('User Module - E2E', () => {
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

  const generateCreateUserDto = () => {
    return {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  };

  const generateLoginUserDto = () => {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  };

  describe(`POST /users/register`, () => {
    it('Should return status 400 while sending invalid body', async () => {
      await nestApp.post('/users/register').expect(400);
      await nestApp.post('/users/register').send({}).expect(400);
      await nestApp.post('/users/register').send({ email: faker.internet.email() }).expect(400);
      await nestApp
        .post('/users/register')
        .send({ email: faker.internet.email(), name: faker.name.findName() })
        .expect(400);
    });

    it('Should return status 409 when email is already registered', async () => {
      const createUserDto = generateCreateUserDto();

      await nestApp.post('/users/register').send(createUserDto);
      await nestApp.post('/users/register').send(createUserDto).expect(409);
    });

    it('Should return status 201 when succesfully creates an user', async () => {
      const createUserDto = generateCreateUserDto();

      await nestApp.post('/users/register').send(createUserDto).expect(201);
    });
  });

  describe(`POST /users/login`, () => {
    it('Should return status 400 while sending invalid body', async () => {
      await nestApp.post('/users/login').expect(400);
      await nestApp.post('/users/login').send({}).expect(400);
      await nestApp.post('/users/login').send({ email: faker.internet.email() }).expect(400);
    });

    it('Should return status 404 when email is not registered', async () => {
      const loginUserDto = generateLoginUserDto();

      await nestApp.post('/users/login').send(loginUserDto).expect(404);
    });

    it('Should return status 401 when password is invalid', async () => {
      const createUserDto = generateCreateUserDto();

      await nestApp.post('/users/register').send(createUserDto);
      await nestApp
        .post('/users/login')
        .send({ email: createUserDto.email, password: faker.internet.password() })
        .expect(401);
    });

    it('Should return status 200 when an user succesfully login', async () => {
      const createUserDto = generateCreateUserDto();

      await nestApp.post('/users/register').send(createUserDto);
      await nestApp
        .post('/users/login')
        .send({ email: createUserDto.email, password: createUserDto.password })
        .expect(200);
    });

    it('Should return an authToken when an user succesfully login', async () => {
      const createUserDto = generateCreateUserDto();

      await nestApp.post('/users/register').send(createUserDto);
      const response = await nestApp
        .post('/users/login')
        .send({ email: createUserDto.email, password: createUserDto.password });

      expect(response.body).toMatchObject({ token: expect.any(String) });
    });
  });
});
