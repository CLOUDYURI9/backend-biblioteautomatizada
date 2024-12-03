import { DatabaseModel } from "./DatabaseModel";

const database =  new DatabaseModel().pool;

/**
 * Classe que representa um emprestimo.
 */
export class Emprestimo {

    /* Atributos */
    /* Identificador do emprestimo */
    private idEmprestimo: number = 0;
    /* Identifiacdor do aluno */
    private idAluno: number;
    /* Identificador do livro */
    private idLivro: number;
    /* Data de emprestimo do livro */
    private dataEmprestimo: Date;
    /* Data de devolução do livro */
    private dataDevolucao: Date;
    /* Status de emprestimo do aluno*/
    private statusEmprestimo: string;

    /**
     * Construtor da classe Emprestimo
     * 
     * @param idAluno Identificador do aluno
     * @param idLivro Identificado do livro
     * @param dataEmprestimo data de emprestimo do livro
     * @param dataDevolucao Data de devolução do livro
     * @param statusEmprestimo status de emprestimo do livro
     */
    constructor(
        idAluno: number,
        idLivro: number,
        dataEmprestimo: Date,
        dataDevolucao: Date,
        statusEmprestimo: string,
    ) {
        this.idAluno = idAluno;
        this.idLivro = idLivro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.statusEmprestimo = statusEmprestimo;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do emprestimo
     * @returns o identificador do emprestimo
     */
    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    /**
     * Atribui um valor ao identificador do emprestimo
     * @param idEmprestimo novo identificado do emprestimo
     */
    public setIdEmprestimo(idEmprestimo: number): void {
        this.idEmprestimo = idEmprestimo;
    }

    /**
     * Retorna o identificador do aluno.
     *
     * @returns {string} O identificador do aluno.
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Define o identificador do aluno.
     * 
     * @param idAluno - O identificador do aluno a ser definida.
     */
    public setIdALuno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
     * Retorna o identificador do livro.
     *
     * @returns {string} O identificador do livro.
     */
    public getIdLivro(): number {
        return this.idLivro;
    }

    /**
     * Define o identificador do livro.
     *
     * @param idLivro - O identificador do livro.
     */
    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    /**
     * Retorna a data de emprestimo do livro.
     *
     * @returns A data de emprestimo do livro.
     */
    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    /**
     * Define a data de emprestimo do livro.
     * 
     * @param dataEmprestimo - a data de emprestimo do livro a ser definido.
     */
    public setDataEmprestimo(dataEmprestimo: Date): void {
        this.dataEmprestimo = dataEmprestimo;
    }

    /**
     * Retorna a data de devolução do livro.
     *
     * @returns {string} A data de devolução do livro.
     */
    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }

    /**
     * Define a data de devolução do livro.
     * 
     * @param dataDevolucao - A data de devoluçao do livro.
     */
    public setDevolucao(dataDevolucao: Date): void {
        this.dataDevolucao = dataDevolucao;
    }

    /**
     * Retorna o status do emprestimo do livro.
     *
     * @returns {string} O status de emprestimo do livro.
     */
    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;
    }

    /**
    * Define o status de emprestimo do livro.
    *
    * @param statusEmprestimo - O status de emprestimo do livro.
    */
    public setStatusEmprestimo(statusEmprestimo: string): void {
        this.statusEmprestimo = statusEmprestimo;
    }


    //METODO PARA ACESSAR O BANCO DE DADOS
    //CRUD CREAT - READ - UPDATE - DELETE

    /**
    * Método estático responsável por listar todos os emprestimos do banco de dados.
    * Este método faz uma consulta no banco de dados, cria objetos `Emprestimo` para cada 
    * linha retornada e os adiciona a uma lista, que é retornada ao final.
    * 
    * @returns {Promise<Array<Emprestimo> | null>} Retorna uma lista de objetos `Emprestimo` 
    * em caso de sucesso, ou `null` em caso de erro.
    */
    static async listarEmprestimo(): Promise<Array<Emprestimo> | null> {
        //criando lista vazia para armazenar os livros
        let listaDeEmprestimo: Array<Emprestimo> = [];

        try {
            //QUERY PARA CONSULTA NO BANCO DE DADOS
            const querySelectEmprestimo = `SELECT 
            id_emprestimo, aluno.nome AS nome_aluno, 
            livro.titulo AS nome_livro,
            data_emprestimo, data_devolucao, status_emprestimo
        FROM 
            Emprestimo
        INNER JOIN 
            Aluno ON Emprestimo.id_aluno = Aluno.id_aluno
        INNER JOIN 
            Livro ON Emprestimo.id_livro = Livro.id_livro;`;

            //EXECUTA A QUERY NO BANCO DE DADOS
            const respostaBD = await database.query(querySelectEmprestimo);
            
            //PERCORRE CADA RESULTADO RETORNADO PELO BANCO DE DADOS
            //LIVRO É O APELIDO QUE DEMOS PARA CADA LINHA RETPRNADO DO BANCO DE DADOS

            //CRIANDO OBJETO ALUNO
            respostaBD.rows.forEach((emprestimo) => {
                let novaEmprestimo = new Emprestimo(
                    emprestimo.nome_aluno,
                    emprestimo.nome_livro,
                    emprestimo.data_emprestimo,
                    emprestimo.data_devolucao,
                    emprestimo.status_emprestimo                    
                );
                // adicionando o ID ao objeto
                novaEmprestimo.setIdEmprestimo(emprestimo.id_emprestimo);

                //adicionando o aluno na lista
                listaDeEmprestimo.push(novaEmprestimo);
            });

            return listaDeEmprestimo;

        } catch (error) {
            console.log(`Erro ao acessar o modelo : ${error}`);
            return null;
        }
    }

     /**
     * Realiza o cadastro de um livro no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Livro` e insere seus dados (idAluno, idLivro, dataEmprestimo, dataDevolucao e statusEmprestimo)
     * na tabela `emprestimo` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Emprestimo} emprestimo - Objeto contendo os dados do emprestimo que será cadastrado. O objeto `emprestimo`
     *                        deve conter os métodos `getIdAluno()`, `getIdLivro()`, `getDataEmprestimo()`, `getDataDevolucao` e `getStatusEmprestimo`
     *                        que retornam os respectivos valores do emprestimo.
     * @returns {Promise<boolean>} - Retorna `true` se o emprestimo foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
     static async cadastroEmprestimo(emprestimo: Emprestimo): Promise<boolean> {
        try {
            // query para fazer insert de um emprestimo no banco de dados
            const queryInsertEmprestimo = `INSERT INTO emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo )
                                        VALUES
                                        (${emprestimo.getIdAluno()}, 
                                        ${emprestimo.getIdLivro()}, 
                                        '${emprestimo.getDataEmprestimo()}',
                                        '${emprestimo.getDataDevolucao()}',
                                        '${emprestimo.getStatusEmprestimo()}')  
                                        RETURNING id_emprestimo;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertEmprestimo);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Emprestimo cadastrado com sucesso! ID do emprestimo: ${respostaBD.rows[0].id_emprestimo}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o emprestimo. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }

    static async removerEmprestimo(idEmprestimo: number): Promise<boolean> {
        try {
            //cria uma query para deletar um objeto do banco de dados, passando como parametro o id do emprestimo recebido na função
            const queryDeleteEmprestimo = `DELETE FROM emprestimo WHERE id_emprestimo = ${idEmprestimo}`
        
            //executar a query e armazenar a resposta do BD
            const respostaBD = await database.query(queryDeleteEmprestimo);

            //verifica se a quantidade de linhas modificadas é diferente de 0
            if(respostaBD.rowCount != 0) {
                console.log(`Emprestimo removido com sucesso! ID do emprestimo: ${idEmprestimo}`);
                //true significa que a remoção foi bem sucedida
                return true;
            }
            //false, o que indica que a remoção não foi bem sucedida
            return false; 
            

        //trata qualquer erro que possa acontecer no caminho
        } catch (error) {
            //exibe uma mensagem de erro
            console.log(`Erro ao remover o emprestimo. Verifique os logs para mais detalhes.`)
            //imprime o erro no console da API
            console.log(error);
            //retorna false, o que indica a remoção não foi feita
            return false;   
        }
    }

    static async atualizarEmprestimo(emprestimo: Emprestimo): Promise<boolean> {
        try {
            //cria a query de update a ser executada no bando de dados
            const queryUpdateEmprestimo = `UPDATE emprestimo SET
                                        id_aluno = '${emprestimo.getIdAluno()}',
                                        id_livro = '${emprestimo.getIdLivro()}',
                                        data_emprestimo = '${emprestimo.getDataEmprestimo()}',
                                        data_devolucao = '${emprestimo.getDataDevolucao()}'
                                        WHERE id_emprestimo = ${emprestimo.getIdEmprestimo()};`;

            // executar a query e armazenar a resposta do banco de dados em uma variazvel
            const respostaBD = await database.query(queryUpdateEmprestimo);
            //verifica se alguma linha foi alterado
            if(respostaBD.rowCount != 0) {
                //imprime uma mensagem de sucesso no console
                console.log(`Emprestimo atualizado com sucesso! ID do emprestimo: ${emprestimo.getIdEmprestimo()}`);
                return true;
            }
            //retorna falso, indicando que a query não foi executada com sucesso.
            return false; 

        } catch (error) {
             //exibe uma mensagem de erro
             console.log(`Erro ao atualizar emprestimo. Verifique os logs para mais detalhes.`)
             //imprime o erro no console da API
             console.log(error);
             //retorna false, o que indica a remoção não foi feita
             return false;   
        }

    }
}