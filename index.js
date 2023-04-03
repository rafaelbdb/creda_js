const titulo = document.getElementById('titulo');
const sair = document.getElementById('sair');
const formUsuario = document.getElementById('formUsuario');
const cadastraNome = document.getElementById('cadastraNome');
const cadastraEmail = document.getElementById('cadastraEmail');
const cadastraSenha = document.getElementById('cadastraSenha');
const saldoInicial = document.getElementById('saldoInicial');
const cadastrarUsuario = document.getElementById('cadastrarUsuario');
const mostrarLogin = document.getElementById('mostrarLogin');
const formLogin = document.getElementById('formLogin');
const loginEmail = document.getElementById('loginEmail');
const loginSenha = document.getElementById('loginSenha');
const mostrarCadastroUsuario = document.getElementById(
    'mostrarCadastroUsuario',
);
const formMovimentacao = document.getElementById('formMovimentacao');
const tituloMov = document.getElementById('tituloMov');
const valor = document.getElementById('valor');
const descricao = document.getElementById('descricao');
const criar = document.getElementById('criar');
// const alterar = document.getElementById('alterar');
const obs = document.getElementById('obs');
const idMov = document.getElementById('idMov');
const divMovs = document.getElementById('divMovs');
const tabelaMovs = document.getElementById('tabelaMovs');
const saldoTotal = document.getElementById('saldoTotal');
const mediaDespesas = document.getElementById('mediaDespesas');
const msg = document.getElementById('msg');

sair.addEventListener('click', logout);
mostrarLogin.addEventListener('click', mostraLogin);
mostrarCadastroUsuario.addEventListener('click', mostraCadastroUsuario);
cadastrarUsuario.addEventListener('click', cadastraUsuario);
entrar.addEventListener('click', login);
criar.addEventListener('click', criaMov);
// alterar.addEventListener('click', alteraMov);

function validaFormUsuario() {
    let nome = cadastraNome.value.trim();
    let email = cadastraEmail.value.trim();
    let senha = cadastraSenha.value.trim();
    let saldo = saldoInicial.value.trim();
    let valido = true;

    if (nome === '') {
        msg.innerText = 'Por favor, digite seu nome.';
        valido = false;
    }

    if (email === '' || !email.includes('@')) {
        msg.innerText = 'Por favor, informe um email válido.';
        valido = false;
    }

    if (senha === '') {
        msg.innerText = 'Por favor, digite sua senha.';
        valido = false;
    }

    if (saldo === '' || isNaN(saldo)) {
        msg.innerText =
            'Por favor, digite um valor válido para o saldo inicial.';
        valido = false;
    }

    msg.innerText = '';
    return valido;
}

function validaFormLogin() {
    let email = loginEmail.value.trim();
    let senha = loginSenha.value.trim();
    let valido = true;

    if (email === '' || !email.includes('@')) {
        msg.innerText = 'Por favor, informe um email válido.';
        valido = false;
    }

    if (senha === '') {
        msg.innerText = 'Por favor, digite sua senha.';
        valido = false;
    }

    msg.innerText = '';
    return valido;
}

function validaFormMov() {
    let val = valor.value.trim();
    let desc = descricao.value.trim();
    let valido = true;

    if (val === '' || isNaN(val)) {
        msg.innerText = 'Por favor, digite um valor válido.';
        valido = false;
    }

    if (desc === '') {
        msg.innerText = 'Por favor, digite uma descrição.';
        valido = false;
    }

    msg.innerText = '';
    return valido;
}

function cadastraUsuario(event) {
    event.preventDefault();

    msg.innerText = '';

    if (validaFormUsuario()) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
        //   const hashSenha = hashSenha(cadastraSenha.value);
        const novoUsuario = {
            [cadastraEmail.value]: {
                nome: cadastraNome.value,
                //   senha: hashSenha,
                senha: cadastraSenha.value,
                saldo: saldoInicial.value || 0.0,
            },
        };

        try {
            if (usuarios[cadastraEmail.value]) {
                msg.innerText = 'Usuário já possui cadastro!';
                return mostraLogin();
            }

            // usuarios.push(novoUsuario);
            const usuariosComNovo = Object.assign({}, usuarios, novoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuariosComNovo));
            usuarios = JSON.parse(localStorage.getItem('usuarios'));
            if (usuarios[cadastraEmail.value]) {
                msg.innerText = 'Usuário cadastrado com sucesso!';

                return true;
            }
        } catch (error) {
            console.error(error);
        }
        return false;
    }

    return false;
}

function login(event) {
    // JSON.parse(localStorage.getItem('usuarios'))['teste@borjovsky.com']['nome']
    event.preventDefault();
    if (validaFormLogin()) {
        try {
            const visitante = {
                email: loginEmail.value,
                senha: loginSenha.value,
            };

            // const hashSenhaVisitante = hashSenha(visitante['senha']);
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const existente = usuarios[visitante['email']];

            // if (existente && existente['senha'] == hashSenhaVisitante) {
            if (existente && existente['senha'] == visitante['senha']) {
                localStorage.setItem('logado', visitante['email']);

                return mostraBemVindo();
            }
            msg.innerText =
                !visitante['email'] || !visitante['senha']
                    ? 'Email e senha obrigatórios'
                    : 'Usuário não cadastrado!';
            // return mostraCadastroUsuario();
            return false;
        } catch (error) {
            console.error(error);
        }
    }

    return false;
}

function logout(event) {
    event.preventDefault();
    try {
        localStorage.removeItem('logado');
        mostraLogin();

        return !verificaLogado();
    } catch (error) {
        console.error(error);
    }

    return false;
}

function verificaLogado() {
    try {
        return localStorage.getItem('logado');
    } catch (error) {
        console.error(error);
    }

    return false;
}

function mostraLogin() {
    try {
        titulo.innerText = 'Faça Login';
        formLogin.style.display = 'block';
        formUsuario.style.display = 'none';
        formMovimentacao.style.display = 'none';
        sair.style.display = 'none';
        tabelaMovs.style.display = 'none';
        saldoTotal.style.display = 'none';
        mediaDespesas.style.display = 'none';

        let exibindo = formLogin.offsetParent !== formUsuario.offsetParent;
        return exibindo;
    } catch (error) {
        console.error(error);
    }

    return false;
}

function mostraCadastroUsuario() {
    try {
        titulo.innerText = 'Faça seu cadastro';
        formUsuario.style.display = 'block';
        formLogin.style.display = 'none';
        formMovimentacao.style.display = 'none';
        sair.style.display = 'none';
        tabelaMovs.style.display = 'none';
        saldoTotal.style.display = 'none';
        mediaDespesas.style.display = 'none';

        let exibindo = formLogin.offsetParent !== formUsuario.offsetParent;

        return exibindo;
    } catch (error) {
        console.error(error);
    }

    return false;
}

function mostraBemVindo() {
    try {
        const usuarios = JSON.parse(localStorage.getItem('usuarios'));
        const email = localStorage.getItem('logado');
        const nome = usuarios[email]['nome'];

        titulo.innerText = `Bem-vindo ${nome}!`;
        formUsuario.style.display = 'none';
        formLogin.style.display = 'none';
        formMovimentacao.style.display = 'block';
        sair.style.display = 'block';
        tabelaMovs.style.display = 'contents';

        return listaMovs();
    } catch (error) {
        console.error(error);
    }

    return false;
}

// funciona, mas tem alguma cagada por questão de assync ou alguma merda dessa
function criaMov(event) {
    event.preventDefault();
    if (validaFormMov()) {
        try {
            const logado = localStorage.getItem('logado');
            const novaMov = {
                valor: valor.value,
                descricao: descricao.value,
            };
            const todasMovs = JSON.parse(localStorage.getItem('movs'));

            if (todasMovs) {
                if (todasMovs.hasOwnProperty(logado)) {
                    todasMovs[logado].push(novaMov);
                } else {
                    todasMovs.push({ [logado]: novaMov });
                }
                localStorage.setItem('movs', JSON.stringify(todasMovs));
            } else {
                localStorage.setItem(
                    'movs',
                    JSON.stringify({ [logado]: novaMov }),
                );
            }

            if (
                Object.entries(JSON.parse(localStorage.getItem('movs'))[logado])
                    .length === 0
            ) {
                return false;
            }
            let texto = valor.value >= 0.0 ? 'Receita' : 'Despesa';
            texto += ' cadastrada com sucesso!';
            msg.innerText = texto;
            return true;
        } catch (error) {
            console.error(error);
        }
    }

    return false;
}

function formMovAltera(event, id) {
    event.preventDefault();
    // debugger
    const logado = localStorage.getItem('logado');
    const todosMovs = JSON.parse(localStorage.getItem('movs'));
    const movsLogado = todosMovs[logado];
    const movAlterar = movsLogado[id];
    valor.value = movAlterar['valor'];
    descricao.value = movAlterar['descricao'];
    criar.innerText = 'Alterar';
    criar.value = 'alterar';
    criar.removeEventListener('click', criaMov);
    criar.addEventListener('click', (event) => {
        alteraMov(event, id, logado, todosMovs, movsLogado, movAlterar);
    });
}

function alteraMov(event, id, logado, todosMovs, movsLogado, movAlterar) {
    event.preventDefault();
    try {
        // debugger
        if (validaFormMov()) {
            const novosDados = {
                valor: valor.value,
                descricao: descricao.value,
            };
            movAlterar['valor'] = novosDados['valor'];
            movAlterar['descricao'] = novosDados['descricao'];
            movsLogado[id] = movAlterar;
            todosMovs[logado] = movsLogado;
            localStorage.setItem('movs', JSON.stringify(todosMovs));

            // busca de novo a movimentação alterada
            const movAlterado = JSON.parse(localStorage.getItem('movs'))[
                logado
            ][id];
            if (
                movAlterado['valor'] === novosDados['valor'] &&
                movAlterado['descricao'] === novosDados['descricao']
            ) {
                msg.innerText = 'Movimentação alterada com sucesso!';
                criar.removeEventListener('click', alteraMov);
                criar.addEventListener('click', criaMov);
                mostraBemVindo();
                return true;
            }
        }
    } catch (error) {
        console.error(error);
    }

    return false;
}

function deletaMov(event, id) {
    event.preventDefault();
    try {
        const logado = localStorage.getItem('logado');
        let movs = JSON.parse(localStorage.getItem('movs'));
        delete movs[logado][id];
        localStorage.setItem('movs', JSON.stringify(movs));

        movs = JSON.parse(localStorage.getItem('movs'));
        if (!movs[logado][id]) {
            msg.innerText = 'Movimentação deletada com sucesso!';
            return true;
        }
    } catch (error) {
        console.error(error);
    }

    return false;
}

function limpaTabelaMovs() {
    const tabela = document.getElementById('tabelaMovs');
    const rows = tabela.rows;

    for (let i = rows.length - 1; i >= 1; i--) {
        tabela.deleteRow(i);
    }
    saldoTotal.innerText = 'Saldo Total:';
    mediaDespesas.innerText = 'Média de despesas:';
}

function listaMovs() {
    try {
        const logado = localStorage.getItem('logado');
        const movsLogado =
            JSON.parse(localStorage.getItem('movs'))[logado] || {};

        if (!Array.isArray(movsLogado) || movsLogado.length === 0) {
            return false;
        }

        limpaTabelaMovs();
        movsLogado.forEach((m, i) => {
            if (!m) {
                return;
            }
            const linha = document.createElement('tr');
            const valor = document.createElement('td');
            const descricao = document.createElement('td');
            const celulaAlterar = document.createElement('td');
            const celulaDeletar = document.createElement('td');
            const alterar = document.createElement('button');
            const deletar = document.createElement('button');
            const lapis = document.createElement('img');
            const lixeira = document.createElement('img');

            lapis.src = 'pencil.png';
            lixeira.src = 'trash.png';
            celulaAlterar.id = 'alterar_' + i;
            celulaDeletar.id = 'deletar_' + i;
            alterar.type = 'submit';
            deletar.type = 'submit';

            celulaAlterar.appendChild(alterar);
            celulaDeletar.appendChild(deletar);
            alterar.appendChild(lapis);
            deletar.appendChild(lixeira);

            celulaAlterar.addEventListener('click', (event) => {
                formMovAltera(event, i);
            });
            celulaDeletar.addEventListener('click', (event) => {
                deletaMov(event, i);
            });

            valor.innerText = m['valor'];
            descricao.innerText = m['descricao'];
            linha.appendChild(valor);
            linha.appendChild(descricao);
            linha.appendChild(celulaAlterar);
            linha.appendChild(celulaDeletar);
            tabelaMovs.appendChild(linha);
        });

        calculaSaldoTotal();
        calculaMediaDespesas();
        return true;
    } catch (error) {
        console.error(error);
    }

    return false;
}

function hashSenha(senha) {
    try {
        // Hash password using SHA-256
        const sha256 = window.crypto.subtle.digest(
            'SHA-256',
            new TextEncoder().encode(senha),
        );

        // Convert hash to hex string
        const hashArray = Array.from(new Uint8Array(sha256));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');

        return hashHex;
    } catch (error) {
        console.error(error);
    }

    return false;
}

function calculaSaldoTotal() {
    try {
        const logado = localStorage.getItem('logado');
        const usuarios = JSON.parse(localStorage.getItem('usuarios'));
        const saldoAtual = parseFloat(usuarios[logado]['saldo']);
        const movsLogado = JSON.parse(localStorage.getItem('movs'))[logado];
        const novoSaldo = movsLogado.reduce((acc, item) => {
            return item && item['valor']
                ? acc + parseFloat(item['valor'])
                : acc;
        }, saldoAtual);
        saldoTotal.innerText +=
            ' ' +
            novoSaldo.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });
        return novoSaldo;
    } catch (error) {
        console.error(error);
    }
    return 0.0;
}

function calculaMediaDespesas() {
    try {
        const logado = localStorage.getItem('logado');
        const movsLogado = JSON.parse(localStorage.getItem('movs'))[logado];
        let qtdDespesas = movsLogado.filter((obj) => {
            if (obj && obj.valor) {
                return parseInt(obj.valor) < 0.0;
            }
        }).length;
        const somaDespesas = movsLogado.reduce((acc, curr) => {
            if (curr && curr['valor']) {
                const valor = parseFloat(curr['valor']);
                return valor < 0.0 ? acc + valor : acc;
            } else {
                return acc;
            }
        }, 0.0);
        const media = somaDespesas / qtdDespesas;
        mediaDespesas.innerText +=
            ' ' +
            media.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });
        return media;
    } catch (error) {
        console.error(error);
    }
    return 0.0;
}

window.onload = () => {
    let formOculto = formLogin.style.display !== 'block';
    let logado = verificaLogado();

    if (!logado) {
        if (formOculto) {
            mostraLogin();
        }
    } else {
        mostraBemVindo();
    }
};
