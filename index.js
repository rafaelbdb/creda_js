const titulo = document.getElementById('titulo');
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

mostrarLogin.addEventListener('click', mostraLogin);
mostrarCadastroUsuario.addEventListener('click', mostraCadastroUsuario);
cadastrarUsuario.addEventListener('click', cadastraUsuario);
entrar.addEventListener('click', login);
registrar.addEventListener('click', registraMov);
alterar.addEventListener('click', alteraMov);

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
                movs: {},
                saldo: saldoInicial.value || 0.0,
            },
        };

        try {
            if (usuarios[cadastraEmail.value]) {
                msg.innerText = 'Usuário já possui cadastro!';
                console.log('Usuário já possui cadastro!');
                console.log(`cadastraUsuario => mostraLogin()`);
                return mostraLogin();
            }

            // usuarios.push(novoUsuario);
            const usuariosComNovo = Object.assign({}, usuarios, novoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuariosComNovo));
            usuarios = JSON.parse(localStorage.getItem('usuarios'));
            if (usuarios[cadastraEmail.value]) {
                msg.innerText = 'Usuário cadastrado com sucesso!';
                console.log('Usuário cadastrado com sucesso!');

                console.log(`cadastraUsuario => ${true}`);
                return true;
            }
        } catch (error) {
            console.error(error);
        }
        return false;
    }

    console.log(`cadastraUsuario => ${false}`);
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

                console.log(`login => mostraBemVindo(existente['nome'])`);
                return mostraBemVindo(existente['nome']);
            }
            msg.innerText =
                !visitante['email'] || !visitante['senha']
                    ? 'Email e senha obrigatórios'
                    : 'Usuário não cadastrado!';
            console.log(`login => ${msg.innerText}`);
            console.log(`login => mostraCadastroUsuario()`);
            // return mostraCadastroUsuario();
            return false;
        } catch (error) {
            console.error(error);
        }
    }

    console.log(`login => ${false}`);
    return false;
}

function logout(event) {
    event.preventDefault();
    try {
        localStorage.removeItem('logado');
        mostraLogin();

        console.log(`logout => !verificaLogado()`);
        return !verificaLogado();
    } catch (error) {
        console.error(error);
    }

    console.log(`logout => ${false}`);
    return false;
}

function verificaLogado() {
    try {
        console.log(
            `verificaLogado => ${JSON.parse(localStorage.getItem('logado'))}`,
        );
        return JSON.parse(localStorage.getItem('logado'));
    } catch (error) {
        console.error(error);
    }

    console.log(`verificaLogado => ${false}`);
    return false;
}

function mostraLogin() {
    try {
        titulo.innerText = 'Faça Login';
        formLogin.style.display = 'block';
        formUsuario.style.display = 'none';
        formMovimentacao.style.display = 'none';
        tabelaMovs.style.display = 'none';

        let exibindo = formLogin.offsetParent !== formUsuario.offsetParent;
        console.log(`mostraLogin => ${exibindo}`);
        return exibindo;
    } catch (error) {
        console.error(error);
    }

    console.log(`mostraLogin => ${false}`);
    return false;
}

function mostraCadastroUsuario() {
    try {
        titulo.innerText = 'Faça seu cadastro';
        formUsuario.style.display = 'block';
        formLogin.style.display = 'none';
        formMovimentacao.style.display = 'none';
        tabelaMovs.style.display = 'none';

        let exibindo = formLogin.offsetParent !== formUsuario.offsetParent;
        console.log(`mostraCadastroUsuario => ${exibindo}`);

        return exibindo;
    } catch (error) {
        console.error(error);
    }

    console.log(`mostraCadastroUsuario => ${false}`);
    return false;
}

function mostraBemVindo(nome) {
    try {
        titulo.innerText = `Bem-vindo ${nome}!`;
        formUsuario.style.display = 'none';
        formLogin.style.display = 'none';
        formMovimentacao.style.display = 'block';
        tabelaMovs.style.display = 'block';

        console.log(`mostraBemVindo => ${true}`);
        return true;
    } catch (error) {
        console.error(error);
    }

    console.log(`mostraBemVindo => ${false}`);
    return false;
}

function registraMov(event) {
    event.preventDefault();
    if (validaFormMov()) {
        try {
            let email = JSON.parse(localStorage.getItem('logado'));
            if (!email) {
                mostraLogin();

                console.log(`registraMov => ${false}`);
                return false;
            }
            let usuarioLogado = JSON.parse(localStorage.getItem(email));
            let movs = usuarioLogado['movs'] || [];
            const nova = {
                valor: valor.value,
                descricao: descricao.value,
            };
            movs.push(nova);
            localStorage.setItem(usuarioLogado['movs'], JSON.stringify(movs));

            console.log(`registraMov => ${true}`);
            return true;
        } catch (error) {
            console.error(error);
        }
    }

    console.log(`registraMov => ${false}`);
    return false;
}

function alteraMov(event) {
    event.preventDefault();
    if (validaFormMov()) {
        try {
            let id = idMov.value;
            let email = JSON.parse(localStorage.getItem('logado'));
            if (!email) {
                mostraLogin();

                console.log(`alteraMov => ${false}`);
                return false;
            }

            console.log(`alteraMov => ${true}`);
            return true;
        } catch (error) {
            console.error(error);
        }
    }

    console.log(`alteraMov => ${false}`);
    return false;
}

function listaMovs() {
    try {
        let email = JSON.parse(localStorage.getItem('logado'));
        if (!email) {
            //   console.log(`listaMovs => ${!mostraLogin()}`);
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

            movs.forEach((m) => {
                valor.innerText = m['valor'];
                descricao.innerText = m['descricao'];
                linha.appendChild(valor);
                linha.appendChild(descricao);
                tabelaMovs.appendChild(linha);
            });

            console.log(`listaMovs => ${true}`);
            return true;
        }
    } catch (error) {
        console.error(error);
    }

    console.log(`listaMovs => ${false}`);
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

        console.log(`sha256 => ${sha256}`);
        console.log(`hashArray => ${hashArray}`);
        console.log(`hashHex => ${hashHex}`);
        return hashHex;
    } catch (error) {
        console.error(error);
    }

    console.log(`hashSenha => ${false}`);
    return false;
}

function calculaMediaDespesas() {
    try {
        let email = JSON.parse(localStorage.getItem('logado'));
        if (!email) {
            mostraLogin();

            console.log(`calculaMediaDespesas => ${false}`);
            return false;
        }
        let usuarioLogado = JSON.parse(localStorage.getItem(email));
        let movs = usuarioLogado['movs'] || [];
        let qtd = 0;
        let total = 0;
        movs.forEach((m) => {
            if (m < 0) {
                total += m;
                qtd++;
            }
        });
        let media = total / qtd;

        console.log(`calculaMediaDespesas => ${media}`);
        return media;
    } catch (error) {
        console.error(error);
    }

    console.log(`calculaMediaDespesas => ${0.0}`);
    return 0.0;
}

window.onload = () => {
    let formOculto = formLogin.style.display !== 'block';
    let logado = verificaLogado();

    console.log(`onload: formLogin.style.display => ${formOculto}`);
    console.log(`onload: logado => ${logado}`);

    if (!logado) {
        console.log(`onload: !logado`);
        if (formOculto) {
            console.log(`onload: mostraLogin()`);
            mostraLogin();
        }
    } else {
        console.log(`onload: mostraBemVindo()`);
        mostraBemVindo();
    }
};
