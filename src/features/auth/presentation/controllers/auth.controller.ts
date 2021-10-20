import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CryptographyAdapter, UserEntity } from '../../../../core/infra';
import authConfig from '../../../../core/infra/config/auth.config';

export default class AuthController {

  readonly #cryptography: CryptographyAdapter;

    constructor(cryptography: CryptographyAdapter){
      this.#cryptography = cryptography;
    }
  
    public async store(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserEntity.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: "User not found " });
    }
      
    const passwordTest = await this.#cryptography.compare(password, user.password)
    if(passwordTest === false) {
      return res.status(401).json({ msg: "Senha incorreta"});
    }
    
    if (user.pending === true) {
      return res.status(401).json({ msg: "Usuário pendente"});
    }
      
    return res.json({
      token: jwt.sign(
      {
        uuid: user.uid,
      },
      authConfig.secret!,
      {
      expiresIn: authConfig.expiresIn,
      }),
    });
  }
}