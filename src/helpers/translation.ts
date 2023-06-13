type TranslationType = {
  [key: string]: {
    aplicationTitle: string;
    descriptionMeta: string;
    language: string;
    isLogged: string;
    isNotLogged: string;
    saveConversion: string;
    emptyConvertionHistory: string;
    pleaseLogin: string;
    convertionHistory: string;
    deleteConvertionHistory: string
    password: string;
    login: string;
    createAccount: string;
    register: string;
    firstName: string;
    confirmPassword: string;
    returnToHome: string;
    goToRegister: string;
    goToLogin: string;
    logout: string;
  };
};

export const Translation: TranslationType = {
  enUS: {
    aplicationTitle: 'Currency Converter',
    descriptionMeta: 'This is a currency conversion application that enables users to convert the value of one country\'s currency into another country\'s currency.',
    language: 'English',
    isLogged: "Logged",
    isNotLogged: "Not Logged",
    saveConversion: "Save Convertion",
    emptyConvertionHistory: "Empty",
    pleaseLogin: "Please log in to see your Convertion History",
    convertionHistory: 'Convertion History',
    deleteConvertionHistory: "Delete Convertion History",
    password: 'Password',
    login: 'Login',
    createAccount: 'Create Account',
    register: 'Register',
    firstName: 'First Name',
    confirmPassword: 'Confirm password',
    returnToHome: 'Return to Home',
    goToRegister: 'Go to Register',
    goToLogin: 'Go to Login',
    logout: 'Log out'
  },
  ptBR: {
    aplicationTitle: 'Conversor de Moedas',
    descriptionMeta: 'Esta é uma aplicação de conversão de moeda que permite aos usuários converter o valor da moeda de um país para o valor da moeda de outro país.',
    language: 'Português',
    isLogged: "Logado",
    isNotLogged: "Não Logado",
    saveConversion: "Salvar Conversão",
    emptyConvertionHistory: "Vazio",
    pleaseLogin: "Por favor, faça o login para ver seu Histórico de Conversões",
    convertionHistory: 'Histórico de Conversões',
    deleteConvertionHistory: 'Apagar Histórico de Conversões',
    password: 'Senha',
    login: 'Entrar',
    createAccount: 'Criar Conta',
    register: 'Registro',
    firstName: 'Primeiro Nome',
    confirmPassword: 'Confirmar Senha',
    returnToHome: 'Voltar para Home',
    goToRegister: 'Ir para Registro',
    goToLogin: 'Ir para Login',
    logout: 'Deslogar',
  }
}