import { Request, Response, Router} from "express";
import AlunoController from "./controller/AlunoController";
import LivroController from "./controller/LivroController";
import EmprestimoController from "./controller/EmprestimoController";

//Cria um roteador

const router = Router();



//Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response ) => {
    res.send({ mensagem: "Olá, mundo"});
});

router.get("/aluno", AlunoController.todos);
router.post("/novo/aluno", AlunoController.novo);
router.delete("/delete/aluno/:idAluno", AlunoController.remover);
router.put("/atualizar/aluno/:idAluno", AlunoController.atualizar);


router.get("/livro", LivroController.todos);
router.post("/novo/livro", LivroController.novo);
router.delete("/delete/livro/:idLivro", LivroController.remover)
router.put("/atualizar/livro/:idLivro", LivroController.atualizar);


router.get("/emprestimo", EmprestimoController.todos);
router.delete("/delete/emprestimo/:idEmprestimo", EmprestimoController.remover);
router.put("/atualizar/emprestimo/:idEmprestimo", EmprestimoController.atualizar);

//exportando as rotas
export { router };