import { Request, Response } from "express";
import { Emprestimo } from "../model/Emprestimo";

interface EmprestimoDTO {
    idALuno: number,
    idLivro: number,
    dataEmprestimo: Date,
    dataDevolucao: Date,
    statusEmprestimo : string
}

/**
 * Classe Controller para gerenciar as requisições relacionadas ao objeto emprestimo.
 * Esta classe herda da classe Carro e contém métodos responsáveis por lidar
 * com requisições HTTP.
 */
class EmprestimoController extends Emprestimo{

    /**
     * Método estático responsável por listar todos os emprestimos.
     * Este método faz uma chamada assíncrona ao método `listarEmprestimo` da classe Emprestimo,
     * retornando uma lista de livros no formato JSON.
     *
     * @param {Request} req - O objeto da requisição HTTP.
     * @param {Response} res - O objeto da resposta HTTP.
     * 
     * @returns {Promise<void>} Retorna uma promessa que envia a lista de emprestimos
     * em caso de sucesso, ou uma mensagem de erro em caso de falha.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // Chama o método herdado de listar todos os livros
            const listaDeEmprestimos =  await Emprestimo.listarEmprestimo();
            // Responde com o status 200 e a lista de carros em formato JSON
            res.status(200).json(listaDeEmprestimos)
        } catch (error) {
            console.log(`Erro ao acessar método herdado ${error}`);
             // Exibe erro no console e responde com status 400 e uma mensagem de erro
            res.status(400).json("Erro ao recuperaras informações de emprestimos");
        }
    }
}

export default EmprestimoController;