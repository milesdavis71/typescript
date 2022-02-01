// Project Type
enum ProjectStatus {
  Active,
  Finished,
}

// Project base class
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
