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

    static async remover(req: Request, res: Response): Promise<any> {
        try {
            // recuperando o id do emprestimo que será removido
            const idEmprestimo = parseInt(req.params.idEmprestimo as string);

            // chamando a função de remoção de emprestimo
            const respostaModelo = await Emprestimo.removerEmprestimo(idEmprestimo);
            
            // verificando a resposta da função
            if (respostaModelo) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Emprestimo removido com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao remover o emprestimo. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao remover um emprestimo. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível remover o emprestimo. Entre em contato com o administrador do sistema." });
        }
    }

    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            //recupera as informações a serem atualizadoas no corpo da requisição
            const emprestimoRecebido: EmprestimoDTO = req.body;
            const idEmprestimoRecebido = parseInt(req.params.idEmprestimo as string);

            const emprestimoAtualizado = new Emprestimo(
                emprestimoRecebido.idALuno,
                emprestimoRecebido.idLivro,
                emprestimoRecebido.dataEmprestimo,
                emprestimoRecebido.dataDevolucao,
                emprestimoRecebido.statusEmprestimo
            );

            emprestimoAtualizado.setIdEmprestimo(idEmprestimoRecebido);

            const respostaModelo = await Emprestimo.atualizarEmprestimo(emprestimoAtualizado);

            if(respostaModelo) {
                return res.status(200).json({ mensagem: "Emprestimo atualizado com sucesso!"});
            }else{
            return res.status(400).json({ mensagem: "Erro ao atualizar o emprestimo. Entre em contato com o administrador do sistema"})
            }

        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao atualizar um emprestimo. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível atualizar o emprestimo. Entre em contato com o administrador do sistema." });
        }
    }
}

export default EmprestimoController;