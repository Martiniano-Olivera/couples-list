export interface Activity {
  type: 'pelicula' | 'serie' | 'comida' | 'plan';
  nombre: string;
  plataforma?: string; // Opcional, solo aplica para películas y series
}