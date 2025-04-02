import { Injectable, HttpException, HttpStatus, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserCreateDTO, UserLoginDTO, UserUpdateDTO, GrupoAcessoAddDTO } from './user.dto';
import {GrupoAcessoEntity} from './grupoAcesso.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(GrupoAcessoEntity)
    private grupoAcessoRepository: Repository<GrupoAcessoEntity>,
  ){}

  async all() {
    const users = await this.userRepository.find({
      relations: ['grupoacesso'],
      select: ["cd", "idlogin", "idemail", "idnome", "idcolor","jsturnos"],
    });

    return users
  }
  
  async addGrupoAcesso (data: GrupoAcessoAddDTO) {
    await this.grupoAcessoRepository.save(data)
  }

  async allGrupoAcesso () {
    return await this.grupoAcessoRepository.find()
  }

  async findOne(idlogin: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOne({
      where: { idlogin },
      relations: ['grupoacesso']
    });
    if (!user)  
      return undefined;
    
    return user;
  }

  async login(idlogin: string, idsenha: string) {
    const user = await this.userRepository.findOne({ where: { idlogin } });

    if(!user || !(await user.comparePassword(idsenha))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      )
    }

    return user;
    //if(!user || (await user.comparePassword(a)))
  }

  async register(data: UserCreateDTO) {
    const { idlogin } = data;
    let user = await this.userRepository.findOne({ where: { idlogin } });

    if (user) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }

    user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async update(data: UserUpdateDTO) {
    try {
      let user = await this.userRepository.findOneOrFail({ where: { cd: data.cd }})

      if (data.idlogin)
        user.idlogin = data.idlogin
      if (data.idsenha) {
        user.idsenha = data.idsenha
        await user.hashSenha()
      }
      if (data.grupoacesso)
        user.grupoacesso = data.grupoacesso
      if (data.idemail)
        user.idemail = data.idemail
      if (data.idnome)
        user.idnome = data.idnome
      if (data.jsturnos)
        user.jsturnos = data.jsturnos
      if (data.idcolor)
        user.idcolor = data.idcolor
      await this.userRepository.save(user)
    } catch (err) {
      throw new HttpException(
        'Erro ao modificar',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
