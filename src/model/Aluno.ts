import { DatabaseModel } from "./DatabaseModel";

const database =  new DatabaseModel().pool;
/**
 * Classe que representa um aluno.
 */
export class Aluno {

    /* Atributos */
    /* Identificador do aluno */
    private idAluno: number = 0;
    /* Registro do aluno */
    private ra: string = "";
    /* nome do aluno */
    private nome: string;
    /* Sobrenome do aluno */
    private sobrenome: string;
    /* Data de nascimento do aluno */
    private dataNascimento: Date;
    /* Endereço do aluno*/
    private endereco: string;
    /* E-mail do aluno */
    private email: string;
    /*Celular do aluno */
    private celular: string;


    /**
     * Construtor da classe Aluno
     * 
     * @param nome Nome do aluno
     * @param sobrenome Sobrenome do aluno
     * @param dataNascimento Data de nascimento do aluno
     * @param endereco Endereço do aluno
     * @param email E-mail do aluno
     * @param celular Celular do aluno
     */
    constructor(
        nome: string,
        sobrenome: string,
        dataNascimento: Date,
        endereco: string,
        email: string,
        celular: string
    ) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.email = email;
        this.celular = celular;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do aluno
     * @returns o identificador do aluno
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Atribui um valor ao identificador do aluno
     * @param idAluno novo identificado do aluno
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
     * Retorna o ra do aluno.
     *
     * @returns {string} O registo do aluno.
     */
    public getRa(): string {
        return this.ra;
    }

    /**
     * Define o registro do aluno.
     * 
     * @param ra - O registro do aluno a ser definida.
     */
    public setRa(ra: string): void {
        this.ra = ra;
    }

    /**
     * Retorna o nome do aluno.
     *
     * @returns {string} O nome do aluno.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do aluno.
     *
     * @param nome - O nome do aluno.
     */
    public setAluno(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o sobrenome do aluno.
     *
     * @returns O sobrenoe do aluno.
     */
    public getSobrenome(): string {
        return this.sobrenome;
    }

    /**
     * Define o sobrenome do aluno.
     * 
     * @param sobrenome - O sobrenome do aluno a ser definido.
     */
    public setAno(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    /**
     * Retorna a data de nascimento do aluno.
     *
     * @returns {string} A data de nascimento do aluno.
     */
    public getDataNascimento(): Date {
    return this.dataNascimento;
    }

    /**
     * Define a data de nascimento do aluno.
     * 
     * @param dataNascimento - A data de nascimento do aluno.
     */
    public setDataNascimento(dataNascimento: Date): void {
        this.dataNascimento = dataNascimento;
    }


    /**
     * Retorna o endereco do aluno.
     *
     * @returns {string} O endereço do aluno.
     */
    public getEndereco(): string {
    return this.endereco;
    }

    /**
    * Define o endereço do aluno.
    *
    * @param endereco - O endereço do aluno.
    */
    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    /**
     * Retorna o email do aluno.
     *
     * @returns {string} O email do aluno.
    */
    public getEmail(): string {
    return this.email;
    }
    
    /**
    * Define o e-mail do aluno.
    *
    * @param email - O e-mail do aluno.
    */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
    * Retorna o celular do aluno.
    *
    * @returns {string} O celular do aluno.
    */
    public getCelular(): string {
    return this.celular;
    }
        
    /**
    * Define o celular do aluno.
    *
    * @param celular - O celular do aluno.
    */
    public setCelular(celular: string): void {
        this.celular = celular;
    }

//METODO PARA ACESSAR O BANCO DE DADOS
    //CRUD CREAT - READ - UPDATE - DELETE
    
    /**
    * Método estático responsável por listar todos os alunos do banco de dados.
    * Este método faz uma consulta no banco de dados, cria objetos `Alunos` para cada 
    * linha retornada e os adiciona a uma lista, que é retornada ao final.
    * 
    * @returns {Promise<Array<Aluno> | null>} Retorna uma lista de objetos `Aluno` 
    * em caso de sucesso, ou `null` em caso de erro.
    */
    static async listarAluno(): Promise<Array<Aluno> | null> {
        //criando lista vazia para armazenar os alunos
        let listaDeAluno: Array<Aluno> = [];

        try {
            //QUERY PARA CONSULTA NO BANCO DE DADOS
            const querySelectAluno = `SELECT * FROM aluno;`;

            //EXECUTA A QUERY NO BANCO DE DADOS
            const respostaBD = await database.query(querySelectAluno);

            //PERCORRE CADA RESULTADO RETORNADO PELO BANCO DE DADOS
            //ALUNO É O APELIDO QUE DEMOS PARA CADA LINHA RETPRNADO DO BANCO DE DADOS

            //CRIANDO OBJETO ALUNO
            respostaBD.rows.forEach((aluno) => {
                let novaAluno = new Aluno(
                    aluno.nome,
                    aluno.sobrenome,
                    aluno.data_nascimento,
                    aluno.endereco,
                    aluno.email,
                    aluno.celular
                );
                // adicionando o ID ao objeto
                novaAluno.setIdAluno(aluno.id_aluno);
                novaAluno.setRa(aluno.ra);

                //adicionando o aluno na lista
                listaDeAluno.push(novaAluno);
            });

            return listaDeAluno;

        } catch (error) {
            console.log(`Erro ao acessar o modelo : ${error}`);
            return null;
        }
    }

     /**
     * Realiza o cadastro de um aluno no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Aluno` e insere seus dados (nome, sobrenome, dataNascimento, endereco, email e celular)
     * na tabela `aluno` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Aluno} aluno - Objeto contendo os dados do aluno que será cadastrado. O objeto `Carro`
     *                        deve conter os métodos `getNome()`, `getSobrenome()`, `getDataNascimento()`, `getEndereco`, `getEmail` e `getCelular()`
     *                        que retornam os respectivos valores do carro.
     * @returns {Promise<boolean>} - Retorna `true` se o aluno foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
     static async cadastroAluno(aluno: Aluno): Promise<boolean> {
        try {
            // query para fazer insert de um aluno no banco de dados
            const queryInsertAluno = `INSERT INTO aluno (nome, sobrenome, data_nascimento, endereco, email, celular)
                                    VALUES
                                        ('${aluno.getNome()}', 
                                        '${aluno.getSobrenome()}', 
                                        '${aluno.getDataNascimento()}', 
                                        '${aluno.getEndereco()}',
                                        '${aluno.getEmail()}',
                                        '${aluno.getCelular()}')
                                        RETURNING id_aluno;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertAluno);


            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Aluno cadastrado com sucesso! ID do aluno: ${respostaBD.rows[0].id_aluno}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o aluno. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
}


