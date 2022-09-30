export class Ativo {
  codigo: string;
  price: string;
  results: Result;
}

class Result{
  price: string;
  symbol: string;
  numeroCotas: number;
  precoMedio: string;
  variacao: number;
}
