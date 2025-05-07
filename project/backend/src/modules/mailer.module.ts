import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    NestMailerModule.forRoot({
      transport: {
        host: 'smtp.seuprovedor.com', // Ex: smtp.gmail.com
        port: 587,
        secure: false,
        auth: {
          user: 'seu_email@example.com',
          pass: 'sua_senha',
        },
      },
      defaults: {
        from: '"Seu App" <no-reply@seusite.com>',
      },
      template: {
        dir: join(__dirname, '..', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  exports: [NestMailerModule],
})
export class MailerModule {}
