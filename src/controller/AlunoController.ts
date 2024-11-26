import { Request, Response, response } from "express";
import { Aluno } from "../model/Aluno";

interface AlunoDTO {
    nome: string,
    sobrenome: string,
    dataNascimento: Date,
    endereco: string,
    email : string,
    celular : string
}

/**
 * Classe Controller para gerenciar as requisições relacionadas ao objeto ALuno.
 * Esta classe herda da classe ALuno e contém métodos responsáveis por lidar
 * com requisições HTTP.
 */
class AlunoController extends Aluno{

    /**
     * Método estático responsável por listar todos os alunos.
     * Este método faz uma chamada assíncrona ao método `listarAluno` da classe Aluno,
     * retornando uma lista de alunos no formato JSON.
     *
     * @param {Request} req - O objeto da requisição HTTP.
     * @param {Response} res - O objeto da resposta HTTP.
     * 
     * @returns {Promise<void>} Retorna uma promessa que envia a lista de alunos
     * em caso de sucesso, ou uma mensagem de erro em caso de falha.
     */
    static async todos(req: Request, res: Response) {
        try {
            // Chama o método herdado de listar todos os alunos
            const listaDeAlunos =  await Aluno.listarAluno();
            // Responde com o status 200 e a lista de carros em formato JSON
            res.status(200).json(listaDeAlunos)
        } catch (error) {
            console.log(`Erro ao acessar método herdado ${error}`);
             // Exibe erro no console e responde com status 400 e uma mensagem de erro
            res.status(400).json("Erro ao recuperaras informações de alunos");
        }
    }

    /**
    * Método controller para cadastrar um novo alunos.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um aluno no corpo da requisição
    * e tenta cadastrar este carro no banco de dados utilizando a função `cadastroAluno`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do aluno no formato `AlunoDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada.
    */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface ALunoDTO
            const alunoRecebido: AlunoDTO = req.body;

            // instanciando um objeto do tipo aluno com as informações recebidas
            const novoAluno = new Aluno(alunoRecebido.nome, 
                                        alunoRecebido.sobrenome, 
                                        alunoRecebido.dataNascimento, 
                                        alunoRecebido.endereco,
                                        alunoRecebido.email,
                                        alunoRecebido.celular);

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await Aluno.cadastroAluno(novoAluno);

            // verifica a resposta da função
            if(repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Aluno cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o aluno. Entre em contato com o administrador do sistema."})
            }
            
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um aluno. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o aluno. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover(req: Request, res: Response): Promise<any> {
        try {
            // recuperando o id do aluno que será removido
            const idAluno = parseInt(req.params.idAluno as string);

            // chamando a função de remoção de cliente
            const respostaModelo = await Aluno.removerAluno(idAluno);
            
            // verificando a resposta da função
            if (respostaModelo) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Aluno removido com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao remover o aluno. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao remover um aluno. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível remover o aluno. Entre em contato com o administrador do sistema." });
        }
    }
    
        static async atualizar(req: Request, res: Response): Promise<any> {
            try {
                //recupera as informações a serem atualizadoas no corpo da requisição
                const alunoRecebido: AlunoDTO = req.body;
                const idAlunoRecebido = parseInt(req.params.idAluno as string);

                const alunoAtualizado = new Aluno(
                    alunoRecebido.nome,
                    alunoRecebido.sobrenome,
                    alunoRecebido.dataNascimento,
                    alunoRecebido.endereco,
                    alunoRecebido.email,
                    alunoRecebido.celular
                );

                alunoAtualizado.setIdAluno(idAlunoRecebido);

                const respostaModelo = await Aluno.atualizarAluno(alunoAtualizado);

                if(respostaModelo) {
                    return res.status(200).json({ mensagem: "Aluno atualizado com sucesso!"});
                }else{
                return res.status(400).json({ mensagem: "Erro ao atualizar o aluno. Entre em contato com o administrador do sistema"})
                }

            } catch (error) {
                // lança uma mensagem de erro no console
                console.log(`Erro ao atualizar um aluno. ${error}`);

                // retorna uma mensagem de erro há quem chamou a mensagem
                return res.status(400).json({ mensagem: "Não foi possível atualizar o aluno. Entre em contato com o administrador do sistema." });
            }
        }
}

export default AlunoController;
