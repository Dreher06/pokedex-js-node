
import { createInterface } from "node:readline"
import axios from "axios"
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});


let proximoPoke = '';

function abrirMenu() {
    rl.question("Você esta no menu principal.\n \n Digite\n 1- Listar cinco pokemons\n 2- Detalhar pokemon\n 3- Sair\n ", (opcao) => {
        switch (opcao) {
            case "1":
                listarPokemon()

                break
            case "2":

                detalharPokemon()
                abrirMenu()
                break
            case "3":
                rl.close()
                break

            default:

                console.log("Digite uma opção válida")
                abrirMenu()
        }
    })
}

async function listarPokemon() {
    const offset = 0
    const limite = 5
    const respostaListaApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limite}`)
    const respostaDataListaPoke = respostaListaApi.data
    const pokemons = respostaDataListaPoke.results
    const proximoPoke = respostaDataListaPoke.next;
    const listarPokemons = pokemons.map((poke) => {

        console.log(poke.name)

    })
    rl.question("O que mais você deseja fazer?\n \n 1- Listar os próximos 5 pokemons\n 2- Buscar por pokemon específcio\n 3- Voltar para o menu\n ", async (escolha) => {
        switch (escolha) {
            case "1":
                proximoPokeon(proximoPoke)
                break
            case "2":
                detalharPokemon()
                break
            case "3":
                abrirMenu()
                break
            default:
                console.log("Digite uma opção válida")
        }
    })
}

async function detalharPokemon() {
    rl.question("Digite o nome do pokemon que deseja buscar\nDigite `voltar` para voltar ao menu principal\n ", async (resposta) => {
        if (resposta.toLowerCase() == "voltar") {

            abrirMenu()
        } else {
            try {
                const respostaDetalharApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${resposta}`);
                const detalharPoke = respostaDetalharApi.data;
                console.log(`ID: ${detalharPoke.id}`);
                console.log(`NOME: ${detalharPoke.name}`);
                console.log(`PESO: ${detalharPoke.weight}`);
                console.log(`ALTURA: ${detalharPoke.height}`);
            } catch (error) {
                console.error("Erro ao buscar informações do pokémon:", error.response ? error.response.data : error.message);
            }

            abrirMenu();
        }
    })
}

async function proximoPokeon(proximoPoke) {
    console.log(`próximo poke ${proximoPoke}`)
    const respostaListaApi = await axios.get(proximoPoke);
    const respostaDataListaPoke = respostaListaApi.data;
    const pokemons = respostaDataListaPoke.results;
    const proximaListagem = respostaDataListaPoke.next;


    pokemons.forEach((poke) => {
        console.log(poke.name);
    });

    rl.question("O que mais você deseja fazer?\n \n 1- Listar os próximos 5 pokémons\n 2- Buscar por pokémon específico\n 3- Voltar para o menu\n ", async (escolha) => {
        switch (escolha) {
            case "1":
                proximoPokeon(proximaListagem);
                break;
            case "2":
                detalharPokemon();
                break;
            case "3":
                abrirMenu();
                break;
            default:
                console.log("Digite uma opção válida");
        }
    });
}
abrirMenu();