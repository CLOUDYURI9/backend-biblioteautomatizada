import { Request, Response } from "express";
import { Livro } from "../model/Livro";

interface LivroDTO {
    titulo: string,
    autor: string,
    editora: string,
    anoPublicacao: number,
    isbn : string,
    quantTotal: number,
    quantDisponivel: number,
    valorAquisicao: number,
    statusLivroEmprestado: string
}

/**
 * Classe Controller para gerenciar as requisições relacionadas ao objeto livro.
 * Esta classe herda da classe Carro e contém métodos responsáveis por lidar
 * com requisições HTTP.
 */
class LivroController extends Livro{

    /**
     * Método estático responsável por listar todos os livros.
     * Este método faz uma chamada assíncrona ao método `listarLivros` da classe Livro,
     * retornando uma lista de livros no formato JSON.
     *
     * @param {Request} req - O objeto da requisição HTTP.
     * @param {Response} res - O objeto da resposta HTTP.
     * 
     * @returns {Promise<void>} Retorna uma promessa que envia a lista de livros
     * em caso de sucesso, ou uma mensagem de erro em caso de falha.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // Chama o método herdado de listar todos os livros
            const listaDeLivros =  await Livro.listarLivro();
            // Responde com o status 200 e a lista de carros em formato JSON
            return res.status(200).json(listaDeLivros)
        } catch (error) {
            console.log(`Erro ao acessar método herdado ${error}`);
             // Exibe erro no console e responde com status 400 e uma mensagem de erro
            return res.status(400).json("Erro ao recuperaras informações de livros");
        }
    }

    /**
    * Método controller para cadastrar um novo livro.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um livro no corpo da requisição
    * e tenta cadastrar este livro no banco de dados utilizando a função `cadastroLivro`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do carro no formato `LivroDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
    */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface CarroDTO
            const livroRecebido: LivroDTO = req.body;

            // instanciando um objeto do tipo carro com as informações recebidas
            const novoLivro = new Livro(livroRecebido.titulo, 
                                        livroRecebido.autor, 
                                        livroRecebido.editora, 
                                        livroRecebido.anoPublicacao,
                                        livroRecebido.isbn,
                                        livroRecebido.quantTotal,
                                        livroRecebido.quantDisponivel,
                                        livroRecebido.valorAquisicao,
                                        livroRecebido.statusLivroEmprestado);

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await Livro.cadastroLivro(novoLivro);

            // verifica a resposta da função
            if(repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Livro cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o livro Entre em contato com o administrador do sistema."})
            }
            
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um carro. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o livro. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover(req: Request, res: Response): Promise<any> {
        try {
            // recuperando o id do emprestimo que será removido
            const idLivro = parseInt(req.params.idLivro as string);

            // chamando a função de remoção de emprestimo
            const respostaModelo = await Livro.removerLivro(idLivro);
            
            // verificando a resposta da função
            if (respostaModelo) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Livro removido com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao remover o livro. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao remover um livro. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível remover o livro. Entre em contato com o administrador do sistema." });
        }
    }

    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            //recupera as informações a serem atualizadoas no corpo da requisição
            const livroRecebido: LivroDTO = req.body;
            const idLivroRecebido = parseInt(req.params.idLivro as string);

            const livroAtualizado = new Livro(
                livroRecebido.titulo,
                livroRecebido.autor,
                livroRecebido.editora,
                livroRecebido.anoPublicacao,
                livroRecebido.isbn,
                livroRecebido.quantTotal,
                livroRecebido.quantDisponivel,
                livroRecebido.valorAquisicao,
                livroRecebido.statusLivroEmprestado
            );

            livroAtualizado.setIdLivro(idLivroRecebido);

            const respostaModelo = await Livro.atualizarLivro(livroAtualizado);

            if(respostaModelo) {
                return res.status(200).json({ mensagem: "livro atualizado com sucesso!"});
            }else{
            return res.status(400).json({ mensagem: "Erro ao atualizar o livro. Entre em contato com o administrador do sistema"})
            }

        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao atualizar um livro. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível atualizar o livro. Entre em contato com o administrador do sistema." });
        }
    }
}


export default LivroController;