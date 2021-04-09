import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Entries {
  readonly id: string;
  readonly name?: string;
  readonly scale?: string;
  readonly category?: string;
  readonly manufacturer?: string;
  readonly entryNumber?: string;
  readonly entrantsID?: string;
  constructor(init: ModelInit<Entries>);
  static copyOf(source: Entries, mutator: (draft: MutableModel<Entries>) => MutableModel<Entries> | void): Entries;
}

export declare class Entrants {
  readonly id: string;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly memberOfClub?: string;
  readonly contactPhone?: string;
  readonly entrantNumber?: number;
  readonly age?: number;
  readonly Entries?: (Entries | null)[];
  constructor(init: ModelInit<Entrants>);
  static copyOf(source: Entrants, mutator: (draft: MutableModel<Entrants>) => MutableModel<Entrants> | void): Entrants;
}