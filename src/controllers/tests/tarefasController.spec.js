const connection = require('../../config/db');
const { createTarefa, getTarefas, updateTarefa, deleteTarefa } = require("../tarefasController");

//não afeta o banco de dados (cria um objeto simulado)
jest.mock('../../config/db', () => ({
    query: jest.fn(),
}));

describe('Tarefas Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
  });

  describe('createTarefa', () => {
    it('deve criar uma nova tarefa com sucesso', () => {
      req.body = { descricao: 'Nova tarefa', usuario_id: 1 };

      connection.query.mockImplementation((query, params, callback) => {
        callback(null, { insertId: 123 });
      });

      createTarefa(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ id: 123, descricao: 'Nova tarefa' });
    });

    it('deve retornar erro ao criar uma tarefa', () => {
      req.body = { descricao: 'Nova tarefa', usuario_id: 1 };

      connection.query.mockImplementation((query, params, callback) => {
        callback(new Error('Erro no banco'));
      });

      createTarefa(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao criar a tarefa');
    });
  });

  describe('getTarefas', () => {
    it('deve retornar uma lista de tarefas', () => {
      req.params = { usuario_id: 1 };

      const mockResults = [
        { id: 1, descricao: 'Tarefa 1', usuario_id: 1 },
        { id: 2, descricao: 'Tarefa 2', usuario_id: 1 },
      ];

      connection.query.mockImplementation((query, params, callback) => {
        callback(null, mockResults);
      });

      getTarefas(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResults);
    });

    it('deve retornar erro ao listar tarefas', () => {
      req.params = { usuario_id: 1 };

      connection.query.mockImplementation((query, params, callback) => {
        callback(new Error('Erro no banco'));
      });

      getTarefas(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao listar tarefas');
    });
  });

  describe('updateTarefa', () => {
    it('deve atualizar uma tarefa com sucesso', () => {
      req.params = { id: 1 };
      req.body = { descricao: 'Tarefa atualizada', status: 'concluido' };

      connection.query.mockImplementation((query, params, callback) => {
        callback(null, {});
      });

      updateTarefa(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Tarefa atualizada com sucesso');
    });

    it('deve retornar erro ao atualizar uma tarefa', () => {
      req.params = { id: 1 };
      req.body = { descricao: 'Tarefa atualizada', status: 'concluido' };

      connection.query.mockImplementation((query, params, callback) => {
        callback(new Error('Erro no banco'));
      });

      updateTarefa(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao atualizar tarefa');
    });
  });

  describe('deleteTarefa', () => {
    it('deve deletar uma tarefa com sucesso', () => {
      req.params = { id: 1 };
  
      connection.query.mockImplementation((query, params, callback) => {
        callback(null, {}); // Simula sucesso no delete
      });
  
      deleteTarefa(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Tarefa deletada com sucesso');
    });
  
    it('deve retornar erro ao deletar uma tarefa', () => {
      req.params = { id: 1 };
  
      connection.query.mockImplementation((query, params, callback) => {
        callback(new Error('Erro no banco')); // Simula erro no delete
      });
  
      deleteTarefa(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao deletar tarefa');
    });
  });
  
});
