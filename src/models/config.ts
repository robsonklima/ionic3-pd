export class Config {
  public static CONSTANTS = { 
    OBTENDO_DADOS_SERVIDOR: "Obtendo dados do servidor",
    ERRO_OBTER_DADOS_SERVIDOR: "Erro ao obter dados do servidor",
    CORES: {
      RGB: {
        VERMELHO: "rgba(255, 99, 132, 0.2)",
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
    }
  };

  //public static API_URL = 'http://localhost:60687/api/';
  public static API_URL = 'http://sat.perto.com.br/prjSATWebAPI/api/';
}