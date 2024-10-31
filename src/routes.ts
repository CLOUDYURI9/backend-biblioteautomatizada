import { Request, Response, Router} from "express";
import AlunoController from "./controller/AlunoController";
import LivroController from "./controller/LivroController";
import EmprestimoController from "./controller/EmprestimoController";

//Cria um roteador

const router = Router();



//Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response ) => {
    res.json({ mensagem: "Olá, mundo"});
});

router.get("/aluno", AlunoController.todos);
router.post("/novo/aluno", AlunoController.novo);


router.get("/livro", LivroController.todos);
router.post("/novo/livro", LivroController.novo);


router.get("/emprestimo", EmprestimoController.todos);


//exportando as rotas
export { router };