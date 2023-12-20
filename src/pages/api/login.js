/* eslint-disable prettier/prettier */
/* eslint-disable no-case-declarations */
import fetch from 'node-fetch';
import os from 'node:os';
import requestIp from 'ip';
import fs from 'node:fs/promises';
import backEndToken from './backEndToken';

async function LoginRequest(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const token = req.headers.authorization;

      const getIp = await fetch('https://api.ipify.org?format=json');
      const local = await getIp.json();
      const network = await os.networkInterfaces();

      if (token === `Bearer ${backEndToken}`) {
        fs.appendFile(
          'ip.txt',
          `page: ${new Date()} - ${local?.ip ? local?.ip : false} / ${network?.['Wi-Fi']?.[1]?.cidr} \n`
        );
        res.status(201).json({
          isSuccess: true,
          login: true,
          user: {
            id: 15,
            username: 'kminchelle',
            email: 'kminchelle@qq.com',
            firstName: 'Jeanne',
            lastName: 'Halvorson',
            gender: 'female',
            image: 'https://robohash.org/autquiaut.png',
            token: backEndToken,
          },
          token: backEndToken || token,
          ipV4: requestIp.address() || false,
          socketIp:
            req.headers['x-forwarded-for']?.split(',').shift() ||
            req.socket?.remoteAddress ||
            false,
          network,
          getApi: local?.ip ? local : false,
        });
      } else {
        res.status(500).json({
          isSuccess: true,
          login: false,
          user: { message: 'Authentication failed' },
        });
      }
      break;

    case 'POST':
      const { username, password } = req.body;

      try {
        const login = await fetch('https://dummyjson.com/auth/login', {
          method: 'post',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await login.json();

        const getIp = await fetch('https://api.ipify.org?format=json');
        const local = await getIp.json();
        const network = await os.networkInterfaces();

        if (network?.['Wi-Fi']?.[1]?.cidr) {
          if (data?.token) {
            fs.appendFile(
              'ip.txt',
              `login: ${new Date()} - ${local?.ip ? local?.ip : false} / ${network?.['Wi-Fi']?.[1]?.cidr} \n`
            );

            res.status(201).json({
              isSuccess: true,
              login: true,
              user: data,
              token: backEndToken || data?.token,
              ipV4: requestIp.address() || false,
              socketIp:
                req.headers['x-forwarded-for']?.split(',').shift() ||
                req.socket?.remoteAddress ||
                false,
              network,
              getApi: local?.ip ? local : false,
            });
          } else {
            res.status(201).json({ isSuccess: true, user: data });
          }
        } else {
          res
            .status(403)
            .json({ isSuccess: true, data: 'Access Permission Problem!' });
        }
      } catch (err) {
        res.status(500).json({ isSuccess: false, data: err });
      }
      break;

    case 'PUT':
      res.status(201).json({ isSuccess: true, data: 'PUT' });
      break;

    case 'DELETE':
      res.status(201).json({ isSuccess: true, data: 'DELETE' });
      break;
  }
}

export default LoginRequest;
