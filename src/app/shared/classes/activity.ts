export interface Activity {
  type: 'pelicula' | 'serie' | 'comida' | 'plan';
  name: string;
  platform?: string; // Opcional, solo aplica para películas y series
}

export type ActivityNameAndPlatform = Pick<Activity, 'name' | 'platform'>;

export enum activityType{
  PLAN = 'plan',
  FOOD = 'comida', 
  SERIE = 'serie',
  MOVIE = 'pelicula',   
}