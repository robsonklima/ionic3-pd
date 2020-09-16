export class Config {
  public static CONSTANTS = { 
    VERSAO_APP: '0.0.10',
    MENSAGENS: {
      OBTENDO_DADOS_SERVIDOR: "Obtendo dados do servidor",
      ERRO_OBTER_DADOS_SERVIDOR: "Erro ao obter dados do servidor"
    },
    CORES: {
      RGB: {
        VERMELHO: "rgba(255, 99, 132, 0.2)",
        VERMELHO_ESCURO: "rgba(255, 99, 132, 0.9)",
        AZUL: "rgba(54, 162, 235, 0.2)",
        AMARELO: "rgba(255, 206, 86, 0.2)",
        ROSA: "rgba(75, 192, 192, 0.2)",
        VERDE: "rgba(76, 175, 80, 0.2)",
        CINZA_ESCURO: "rgba(96, 125, 139, 0.2)"
      },
      HEXA: {
        VERMELHO: "#FF6384",
        AZUL: "#36A2EB",
        AMARELO: "#FFCE56",
        ROSA: "#FF6384",
        VERDE: "#4caf50",
        CINZA_ESCURO: "#607D8B"
      }
    },
    METAS: {
      SLA: { M1: 95.0, M2: 92.0 },
      REINCIDENCIA: { M1: 35.0, M2: 32.0 },
      PENDENCIA: { M1: 5.0, M2: 3.0 },
      SPA: { M1: 85.0 }
    }
  };

  //public static API_URL = 'http://localhost:60687/api/';
  public static API_URL = 'https://sat.perto.com.br/prjSATWebAPI/api/';
}