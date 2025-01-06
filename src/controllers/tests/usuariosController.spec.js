// Importando o módulo de conexão com o banco de dados
const connection = require('../../config/db');
const { createUsuario, getUsuarios, updateUsuario, deleteUsuario } = require("../usuariosController");

// Mockando o módulo de conexão com o banco de dados
jest.mock('../../config/db', () => ({
  query: jest.fn(),
}));

describe('Usuarios Controller', () => {
    let req;
    let res;
  
    // Setup antes de cada teste
    beforeEach(() => {
      req = { body: {}, params: {} };
      res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
    });
  
    // Testes para a criação de usuário
    describe('createUsuario', () => {
      it('deve criar um novo usuário com sucesso', () => {
        req.body = { nome: 'Joao', email: 'joao@example.com', senha: '123456' };
  
        // Mockando o comportamento da função query
        connection.query.mockImplementation((query, params, callback) => {
          callback(null, { insertId: 1 });
        });
  
        createUsuario(req, res);
  
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({ id: 1, nome: 'Joao', email: 'joao@example.com' });
      });
  
      it('deve retornar erro ao criar um usuário', () => {
        req.body = { nome: 'Joao', email: 'joao@example.com', senha: '123456' };
  
        connection.query.mockImplementation((query, params, callback) => {
          callback(new Error('Erro no banco'));
        });
  
        createUsuario(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao criar o usuário');
      });
    });
  
    // Testes para listar todos os usuários
    describe('getUsuarios', () => {
      it('deve retornar uma lista de usuários', () => {
        const mockResults = [
          { id: 1, nome: 'Joao', email: 'joao@example.com' },
          { id: 2, nome: 'Joana', email: 'joana@example.com' },
        ];
  
        // Mockando o comportamento da função query
        connection.query.mockImplementation((query, params, callback) => {
          callback(null, mockResults); // Mocka o retorno correto
        });
  
        getUsuarios(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockResults);
      });
  
      it('deve retornar erro ao listar usuários', () => {
        connection.query.mockImplementation((query, params, callback) => {
          callback(new Error('Erro no banco'));
        });
  
        getUsuarios(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao listar usuários');
      });
    });
  
    // Testes para atualizar usuário
    describe('updateUsuario', () => {
      it('deve atualizar um usuário com sucesso', () => {
        req.params = { id: 1 };
        req.body = { nome: 'Joao', email: 'joao@example.com', senha: '123456' };
  
        connection.query.mockImplementation((query, params, callback) => {
          callback(null, {}); // Simula a atualização bem-sucedida
        });
  
        updateUsuario(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Usuário atualizado com sucesso');
      });
  
      it('deve retornar erro ao atualizar um usuário', () => {
        req.params = { id: 1 };
        req.body = { nome: 'Joao', email: 'joao@example.com', senha: '123456' };
  
        connection.query.mockImplementation((query, params, callback) => {
          callback(new Error('Erro no banco'));
        });
  
        updateUsuario(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao atualizar usuário');
      });
    });
  
    // Testes para deletar um usuário
    describe('deleteUsuario', () => {
      it('deve deletar um usuário com sucesso', () => {
        req.params = { id: 1 };
  
        connection.query.mockImplementation((query, params, callback) => {
          callback(null, {}); // Simula a exclusão bem-sucedida
        });
  
        deleteUsuario(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Usuário deletado com sucesso');
      });
  
      it('deve retornar erro ao deletar um usuário', () => {
        req.params = { id: 1 };
  
        connection.query.mockImplementation((query, params, callback) => {
          callback(new Error('Erro no banco'));
        });
  
        deleteUsuario(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Erro ao deletar usuário');
      });
    });
  });