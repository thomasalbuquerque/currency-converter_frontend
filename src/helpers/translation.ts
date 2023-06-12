type TranslationType = {
  [key: string]: {
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