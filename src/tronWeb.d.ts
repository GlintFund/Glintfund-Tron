
  
  interface TronLink {
      request: (params: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
    // Define the structure of TronLink properties and methods
   
  }
  
  interface Window {
    tronWeb: TronWeb;
    tronLink: TronLink; // Adding tronLink to the window interface
  }
  
  declare module "tronweb" {
    export default TronWeb;
  
    class TronWeb {
      static version: string;
      constructor(
        fullNode: string | HttpProvider,
        solidityNode: string | HttpProvider,
        eventServer?: string | HttpProvider,
        privateKey?: string
      );
  
      // Basic properties
      fullNode: HttpProvider;
      solidityNode: HttpProvider;
      eventServer: HttpProvider | undefined;
      defaultPrivateKey: string | undefined;
      defaultAddress: { base58: string; hex: string };
  
      // Core APIs
      trx: Trx;
      contract: ContractFactory;
  
      // Utility Methods
      isAddress(address: string): boolean;
      toHex(value: string): string;
      toUtf8(hex: string): string;
      toBigNumber(amount: string | number): BigNumber;
      sha3(value: string, prefix?: boolean): string;
  
      // Transaction Handling
      sign(transaction: any, privateKey: string): Promise<any>;
      sendRawTransaction(signedTransaction: any): Promise<any>;
      getEventResult(contractAddress: string, eventName: string): Promise<any>;
    }
  
    // HttpProvider Definition
    class HttpProvider {
      constructor(fullNodeUrl: string);
    }
  
    // Transaction APIs
    interface Trx {
      getBalance(address: string): Promise<number>;
      getAccount(address: string): Promise<any>;
      sendTransaction(to: string, amount: number): Promise<any>;
      getTransaction(txID: string): Promise<any>;
      sign(transaction: any, privateKey?: string): Promise<any>;
      broadcast(signedTransaction: any): Promise<any>;
      getContract(contractAddress: string): Promise<any>;
      getTransactionInfo(txID: string): Promise<any>;
    }
  
    // Contract APIs
    interface ContractFactory {
      at(contractAddress: string): Promise<Contract>;
      new(options: ContractOptions): Promise<Contract>;
    }
  
    interface ContractOptions {
      abi: any[];
      address?: string;
      bytecode?: string;
    }
  
    interface Contract {
      address: string;
      abi: any[];
      methods: { [methodName: string]: (...args: any[]) => Promise<any> };
  
      // Basic Contract Interaction Methods
      getPastEvents(event: string, options?: any): Promise<any[]>;
      decodeEvent(log: any): any;
      decodeInput(data: string): any;
    }
  
    // Utility Methods for Account/Contract
    interface TronLink {
      request(options: { method: string }): Promise<any>;
    }
  
    // Define a BigNumber for balance/amount handling
    interface BigNumber {
      toString(base?: number): string;
      toNumber(): number;
    }
  
    // Add the TronLink window property
    interface Window {
      tronWeb: TronWeb;
      tronLink: TronLink;
    }
  }
  