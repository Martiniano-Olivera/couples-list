export class Activity {
  static currentId = 0;
  id: number;
  name: string;
  information?:string;
  constructor(name: string, information?:string) {
    Activity.currentId += 1;
    this.id = Activity.currentId;
    this.name = name;
    this.information = information;
  }
}
