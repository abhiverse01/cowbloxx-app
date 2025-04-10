export interface Cow {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    hasBlock: boolean;
    isTrembling: boolean;
  }
  
  export interface Block {
    x: number;
    y: number;
    width: number;
    height: number;
    beingPushedBy?: string;
  }
  
  export interface GameState {
    cows: Cow[];
    blocks: Block[];
  }
  
  export {};
  