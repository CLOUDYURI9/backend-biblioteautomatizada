import { DatabaseModel } from "./DatabaseModel";

const database =  new DatabaseModel().pool;

/**
 * Classe que representa um livro.
 */
export class Livro {

    /* Atributos */
    /* Identificador do livro */
    private idLivro: number = 0;
    /* Titulo do livro */
    private titulo: string;
    /* Autor do livro */
    private autor: string;
    /* Editora do livro */
    private editora: string;
    /* Ano de publicação do livro */
    private anoPublicado: number;
    /*  Padrão Internacional de Numeração do livo*/
    private isbn: string;
    /* Quantidade total do livro */
    private quantTotal: number;
    /* Quantidade disponivel do livro */
    private quantDisponivel: number;
    /* Valor de aquisição do livro */
    private valorAquisicao: number;
    /* Status do livro emprestado */
    private statusLivroEmprestado: string;


    /**
     * Construtor da classe Aluno
     * 
     * @param titulo Titulo do livro
     * @param autor Autor do livro
     * @param editora Editora do livro
     * @param anoPublicado Ano de publicação do livro
     * @param isbn Padrão internacional de numeração do livro
     * @param quantTotal Quantidade total de livros
     * @param quantDisponivel Quantidade disponivel de livros
     * @param valorAquisicao Valor de aquisição do livro
     * @param statusLivroEmprestado Status do livro emprestado
     */
    constructor(
        titulo: string,
        autor: string,
        editora: string,
        anoPublicado: number,
        isbn: string,
        quantTotal: number,
        quantDisponivel: number,
        valorAquisicao: number,
        statusLivroEmprestado: string
    ) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.anoPublicado = anoPublicado;
        this.isbn = isbn;
        this.quantTotal = quantTotal;
        this.quantDisponivel = quantDisponivel;
        this.valorAquisicao = valorAquisicao;
        this.statusLivroEmprestado = statusLivroEmprestado;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do livro
     * @returns o identificador do livro
     */
    public getIdLivro(): number {
        return this.idLivro;
    }

    /**
     * Atribui um valor ao identificador do livro
     * @param idLivro novo identificado do livro
     */
    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    /**
     * Retorna o titulo do livro.
     *
     * @returns {string} O titulo do livro.
     */
    public getTitulo(): string {
        return this.titulo;
    }

    /**
     * Define o titulo do livro.
     * 
     * @param titulo - O titulo do livro a ser definida.
     */
    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    /**
     * Retorna o autor do livro.
     *
     * @returns {string} O autor do livro.
     */
    public getAutor(): string {
        return this.autor;
    }

    /**
     * Define o autor do livro.
     *
     * @param autor - O autor do livro.
     */
    public setAutor(autor: string): void {
        this.autor = autor;
    }

    /**
     * Retorna a editora do livro.
     *
     * @returns A editora do livro.
     */
    public getEditora(): string {
    return this.editora;
    }

    /**
     * Define A editora do livro.
     * 
     * @param editora - A editora do livro a ser definido.
     */
    public setEditora(editora: string): void {
        this.editora = editora;
    }

    /**
     * Retorna o ano de publicação do livro.
     *
     * @returns {number} ano de publicação do livro.
     */
    public getAnoPublicado(): number {
    return this.anoPublicado;
    }

    /**
     * Define o ano de publicação do livro.
     * 
     * @param anoPublicado - O ano de publicação do livro.
     */
    public setAnoPublicado(anoPublicado: number): void {
        this.anoPublicado = anoPublicado;
    }


    /**
     * Retorna o Padrão Internacional de Numeração do livo.
     *
     * @returns {string} O Padrão Internacional de Numeração do livo.
     */
    public getIsbn(): string {
    return this.isbn;
    }

    /**
    * Define o Padrão Internacional de Numeração do livo.
    *
    * @param isbn - Padrão Internacional de Numeração do livo
    */
    public setIsbn(isbn: string): void {
        this.isbn = isbn;
    }

    /**
    * Retorna a quantidade total de livros.
    *
    * @returns {string} A quntidade total de livros.
    */
    public getQuantTotal(): number {
    return this.quantTotal;
    }
    
    /**
    * Define a quantidade total de livros.
    *
    * @param quantTotal - A quantitade total de livros.
    */
    public setQunatTotal(quantTotal: number): void {
        this.quantTotal = quantTotal;
    }

    /**
    * Retorna a quantidade disponivel de livros.
    *
    * @returns {string} A quantidade disponicel de livros
    */
    public getQuantDisponivel(): number {
    return this.quantDisponivel;
    }
        
    /**
    * Define a quantidade disponivel de livros.
    *
    * @param quantDisponivel - A quantidade disponivel de livros.
    */
    public setQuantDisponivel(quantDisponivel: number): void {
        this.quantDisponivel = quantDisponivel;
    }

    /**
    * Retorna o valor de aquisição do livro
    *
    * @returns {string} O valor de aquisição do livro.
    */
    public getValorAquisicao(): number {
    return this.valorAquisicao;
    }
        
    /**
    * Define o valor de aquisição do livros.
    *
    * @param valorAquisicao - O valor de aquisição do livro.
    */
    public setValorAquisicao(valorAquisicao: number): void {
        this.valorAquisicao = valorAquisicao;
    }

    /**
    * Retorna o status do livro emprestado.
    *
    * @returns {string} O status do livro emprestado.
    */
    public getStatusLivroEmprestado(): string {
    return this.statusLivroEmprestado;
    }
        
    /**
    * Define o status do livro emprestado.
    *
    * @param statusLivroEmprestado - O status do livro emprestado.
    */
    public setStatusLivroEmprestado(statusLivroEmprestado: string): void {
        this.statusLivroEmprestado = statusLivroEmprestado;
    }


//METODO PARA ACESSAR O BANCO DE DADOS
    //CRUD CREAT - READ - UPDATE - DELETE
    
    /**
    * Método estático responsável por listar todos os livros do banco de dados.
    * Este método faz uma consulta no banco de dados, cria objetos `Livros` para cada 
    * linha retornada e os adiciona a uma lista, que é retornada ao final.
    * 
    * @returns {Promise<Array<Livro> | null>} Retorna uma lista de objetos `Aluno` 
    * em caso de sucesso, ou `null` em caso de erro.
    */
    static async listarLivro(): Promise<Array<Livro> | null> {
        //criando lista vazia para armazenar os livros
        let listaDeLivro: Array<Livro> = [];

        try {
            //QUERY PARA CONSULTA NO BANCO DE DADOS
            const querySelectLivro = `SELECT * FROM livro;`;

            //EXECUTA A QUERY NO BANCO DE DADOS
            const respostaBD = await database.query(querySelectLivro);

            //PERCORRE CADA RESULTADO RETORNADO PELO BANCO DE DADOS
            //LIVRO É O APELIDO QUE DEMOS PARA CADA LINHA RETPRNADO DO BANCO DE DADOS

            //CRIANDO OBJETO ALUNO
            respostaBD.rows.forEach((livro) => {
                let novaLivro = new Livro(  
                    livro.titulo,
                    livro.autor,
                    livro.editora,
                    livro.ano_publicacao,
                    livro.isbn,
                    livro.quant_total,
                    livro.quant_disponivel,
                    livro.valor_aquisicao,
                    livro.status_livro_emprestado
                );
                // adicionando o ID ao objeto
                novaLivro.setIdLivro(livro.id_livro);

                //adicionando o livro na lista
                listaDeLivro.push(novaLivro);
            });

            return listaDeLivro;

        } catch (error) {
            console.log(`Erro ao acessar o modelo : ${error}`);
            return null;
        }
    }

     /**
     * Realiza o cadastro de um aluno no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Livro` e insere seus dados (titulo, autor, editora, anoPublicado, isbn, quantidadeTotal, quantidadeDisponivel, valorAquisicao e statusLivroEmprestado)
     * na tabela `livro` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Livro} livro - Objeto contendo os dados do livro que será cadastrado. O objeto `Livro`
     *                        deve conter os métodos `getTitulo()`, `getAutor()`, `getEditora()`, `getAnoPublicado()`, `getIsbn()`, `getQuantidadeDisponivel()`, `getValorAquisicao()`  e `getStatusLivroEmprestado()`
     *                        que retornam os respectivos valores do livro.
     * @returns {Promise<boolean>} - Retorna `true` se o livro foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
     static async cadastroLivro(livro: Livro): Promise<boolean> {
        try {
            // query para fazer insert de um aluno no banco de dados
            const queryInsertLivro = `INSERT INTO livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado)
                                        VALUES
                                        ('${livro.getTitulo()}', 
                                        '${livro.getAutor()}', 
                                        '${livro.getEditora()}', 
                                        '${livro.getAnoPublicado()}',
                                        '${livro.getIsbn()}',
                                        '${livro.getQuantTotal()}',
                                        '${livro.getQuantDisponivel()}',
                                        '${livro.getValorAquisicao()}',
                                        '${livro.getStatusLivroEmprestado()}')
                                        RETURNING id_livro;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertLivro);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Livro cadastrado com sucesso! ID do livro: ${respostaBD.rows[0].id_livro}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o livro. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }

    static async removerLivro(idLivro: number): Promise<boolean> {
        try {
            //cria uma query para deletar um objeto do banco de dados, passando como parametro o id do livro recebido na função
            const queryDeleteLivro = `DELETE FROM livro WHERE id_livro = ${idLivro}`
        
            //executar a query e armazenar a resposta do BD
            const respostaBD = await database.query(queryDeleteLivro);

            //verifica se a quantidade de linhas modificadas é diferente de 0
            if(respostaBD.rowCount != 0) {
                console.log(`Livro removido com sucesso! ID do emprestimo: ${idLivro}`);
                //true significa que a remoção foi bem sucedida
                return true;
            }
            //false, o que indica que a remoção não foi bem sucedida
            return false; 
            

        //trata qualquer erro que possa acontecer no caminho
        } catch (error) {
            //exibe uma mensagem de erro
            console.log(`Erro ao remover o livro. Verifique os logs para mais detalhes.`)
            //imprime o erro no console da API
            console.log(error);
            //retorna false, o que indica a remoção não foi feita
            return false;   
        }
    }

    static async atualizarLivro(livro: Livro): Promise<boolean> {
        try {
            //cria a query de update a ser executada no bando de dados
            const queryUpdateLivro = `UPDATE livro SET
                                        titulo = '${livro.getTitulo()}',
                                        autor = '${livro.getAutor()}',
                                        editora = '${livro.getEditora()}',
                                        ano_publicacao = '${livro.getAnoPublicado()}',
                                        isbn = '${livro.getIsbn()}',
                                        quant_total = '${livro.getQuantTotal()}',
                                        quant_disponivel = '${livro.getQuantDisponivel()}',
                                        valor_aquisicao = '${livro.getValorAquisicao()}',
                                        status_livro_emprestado = '${livro.getStatusLivroEmprestado()}'
                                        WHERE id_livro = ${livro.getIdLivro()};`;

            // executar a query e armazenar a resposta do banco de dados em uma variazvel
            const respostaBD = await database.query(queryUpdateLivro);
            //verifica se alguma linha foi alterado
            if(respostaBD.rowCount != 0) {
                //imprime uma mensagem de sucesso no console
                console.log(`Livro atualizado com sucesso! ID do Livro: ${livro.getIdLivro()}`);
                return true;
            }
            //retorna falso, indicando que a query não foi executada com sucesso.
            return false; 

        } catch (error) {
             //exibe uma mensagem de erro
             console.log(`Erro ao atualizar livro. Verifique os logs para mais detalhes.`)
             //imprime o erro no console da API
             console.log(error);
             //retorna false, o que indica a remoção não foi feita
             return false;   
        }
    }   
}