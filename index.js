const titulo = document.getElementById('titulo');
const formUsuario = document.getElementById('formUsuario');
const cadastraNome = document.getElementById('cadastraNome');
const cadastraEmail = document.getElementById('cadastraEmail');
const cadastraSenha = document.getElementById('cadastraSenha');
const cadastrarUsuario = document.getElementById('cadastrarUsuario');
const mostrarLogin = document.getElementById('mostrarLogin');
const formLogin = document.getElementById('formLogin');
const loginEmail = document.getElementById('loginEmail');
const loginSenha = document.getElementById('loginSenha');
const mostrarCadastroUsuario = document.getElementById('mostrarCadastroUsuario');
const formMovimentacao = document.getElementById('formMovimentacao');
const valor = document.getElementById('valor');
const descricao = document.getElementById('descricao');
const registrar = document.getElementById('registrar');
const alterar = document.getElementById('alterar');
const obs = document.getElementById('obs');
const idMov = document.getElementById('idMov');
const tabelaMovs = document.getElementById('tabelaMovs');
const saldoTotal = document.getElementById('saldoTotal');
const mediaDespesas = document.getElementById('mediaDespesas');
const msg = document.getElementById('msg');

function cadastraUsuario() {
    const novoUsuario = {
        'nome': cadastraNome.value,
        'senha': cadastraSenha.value,
        'movs': {},
        'saldo': 0.00
    };

    try {
        if (!localStorage.getItem(cadastraEmail.value)) {
            localStorage.setItem(cadastraEmail.value, JSON.stringify(novoUsuario));
            msg.innerText = 'Usuário cadastrado com sucesso!';
            return true;
        }
        msg.innerText = 'Usuário já possui cadastro!';
        mostraCadastroUsuario();
    } catch (error) {
        console.error(error);
    }
    return false;
}

function login() {
    // JSON.parse(localStorage.getItem('Usuarios'))['teste@borjovsky.com']['Nome']
    try {
        if (localStorage.getItem(loginEmail.value)) {
            localStorage.setItem('logado', loginEmail.value);

            let nome = JSON.parse(localStorage.getItem(loginEmail.value))['Nome'];
            return mostraBemVindo(nome);
        }
        msg.innerText = 'Usuário já possui cadastro!';
    } catch (error) {
        console.error(error);
    }
    return false;
}

function logout() {
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
        tabelaMovs.style.display = 'none';
        return formLogin.offsetParent !== formUsuario.offsetParent;
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
        tabelaMovs.style.display = 'none';
        return formLogin.offsetParent !== formUsuario.offsetParent;
    } catch (error) {
        console.error(error);
    }
    return false;
}

function mostraBemVindo(nome) {
    try {
        titulo.innerText = `Bem-vindo ${nome}!`;
        return true;
    } catch (error) {
        console.error(error);
    }
    return false;
}

function registraMov() {
    try {
        let email = JSON.parse(localStorage.getItem('logado'));
        if (!email) {
            mostraLogin();
            return false;
        }
        let usuarioLogado = JSON.parse(localStorage.getItem(email));
        let movs = usuarioLogado['movs'] || [];
        const nova = {
            'valor': valor.value,
            'descricao': descricao.value,
        };
        movs.push(nova);
        localStorage.setItem(usuarioLogado['movs'], JSON.stringify(movs));
        return true;
    } catch (error) {
        console.error(error);
    }
    return false;
}

function alteraMov() {
    try {
        let id = idMov.value;
        let email = JSON.parse(localStorage.getItem('logado'));
        if (!email) {
            mostraLogin();
            return false;
        }
        console.log('alteraMov');
        return true;
    } catch (error) {
        console.error(error);
    }
    return false;
}

function listaMovs() {
    try {
        let email = JSON.parse(localStorage.getItem('logado'));
        if (!email) {
            return !mostraLogin();
        }
        let usuarioLogado = JSON.parse(localStorage.getItem(email));
        let movs = usuarioLogado['movs'] || [];

        if (movs) {
            const linha = document.createElement('tr');
            const valor = document.createElement('td');
            const descricao = document.createElement('td');
            const alterar = document.createElement('button');
            const deletar = document.createElement('button');
            const lapis = document.createElement('img');
            const lixeira = document.createElement('img');
            lapis.src = 'pencil.png';
            lixeira.src = 'trash.png';
            lapis.width = '40%';
            lixeira.width = '40%';
            alterar.appendChild(lapis);
            deletar.appendChild(lixeira);

            movs.forEach(m => {
                valor.innerText = m['valor'];
                descricao.innerText = m['descricao'];
                linha.appendChild(valor);
                linha.appendChild(descricao);
                tabelaMovs.appendChild(linha);
            });
            return true;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}

function calculaMediaDespesas() {
    try {
        let email = JSON.parse(localStorage.getItem('logado'));
        if (!email) {
            mostraLogin();
            return false;
        }
        let usuarioLogado = JSON.parse(localStorage.getItem(email));
        let movs = usuarioLogado['movs'] || [];
        let qtd = 0;
        let total = 0;
        movs.forEach(m => {
            if (m < 0) {
                total += m;
                qtd++;
            }
        });
        let media = total / qtd;
        return media;
    } catch (error) {
        console.error(error);
    }
    return 0.00;
}

window.onload = () => {
    if (!verificaLogado()) {
        mostraLogin();
    } else {
        mostraBemVindo();
    }
}