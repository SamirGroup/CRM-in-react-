import { create } from 'zustand';

export interface TurnoverGroup {
  qty: number;
  costSum: number;
  sellSum: number;
}

export type TurnoverGroupKey = 'kirim' | 'returnIn' | 'sotuv' | 'writeOff' | 'returnOut';
export type TurnoverFieldKey = 'qty' | 'costSum' | 'sellSum';

export interface ProductTurnoverRow {
  id: string;
  name: string;
  sku: string;
  unit: string;
  kirim: TurnoverGroup;
  returnIn: TurnoverGroup;
  sotuv: TurnoverGroup;
  writeOff: TurnoverGroup;
  returnOut: TurnoverGroup;
}

function group(qty: number, costSum: number, sellSum: number): TurnoverGroup {
  return { qty, costSum, sellSum };
}

interface ProductTurnoverState {
  rows: ProductTurnoverRow[];
  isLoading: boolean;
  fetchRows: () => Promise<void>;
  updateCell: (id: string, groupKey: TurnoverGroupKey, field: TurnoverFieldKey, value: number) => void;
}

export const useProductTurnoverStore = create<ProductTurnoverState>((set) => ({
  rows: [],
  isLoading: false,

  fetchRows: async () => {
    set({ isLoading: true });

    const mockRows: ProductTurnoverRow[] = [
      {
        id: '1', name: 'iPhone 15 Pro', sku: 'IPH-15-PRO', unit: 'та',
        kirim: group(12, 132000000, 0),
        returnIn: group(1, 11000000, 13500000),
        sotuv: group(9, 99000000, 121500000),
        writeOff: group(0, 0, 0),
        returnOut: group(2, 22000000, 0),
      },
      {
        id: '2', name: 'Samsung S24 Ultra', sku: 'SAM-S24-U', unit: 'та',
        kirim: group(10, 140000000, 0),
        returnIn: group(0, 0, 0),
        sotuv: group(8, 112000000, 136000000),
        writeOff: group(1, 14000000, 0),
        returnOut: group(1, 14000000, 0),
      },
      {
        id: '3', name: 'MacBook Air M3', sku: 'MBA-M3', unit: 'та',
        kirim: group(6, 75000000, 0),
        returnIn: group(0, 0, 0),
        sotuv: group(5, 62500000, 77500000),
        writeOff: group(0, 0, 0),
        returnOut: group(1, 12500000, 0),
      },
      {
        id: '4', name: 'iPad Air 5', sku: 'IPA-5', unit: 'та',
        kirim: group(15, 97500000, 0),
        returnIn: group(2, 13000000, 16000000),
        sotuv: group(11, 71500000, 86900000),
        writeOff: group(0, 0, 0),
        returnOut: group(2, 13000000, 0),
      },
      {
        id: '5', name: 'AirPods Pro 2', sku: 'APP-2', unit: 'та',
        kirim: group(25, 75000000, 0),
        returnIn: group(1, 3000000, 3600000),
        sotuv: group(20, 60000000, 75000000),
        writeOff: group(1, 3000000, 0),
        returnOut: group(3, 9000000, 0),
      },
      {
        id: '6', name: 'JBL Tune 510BT', sku: 'JBL-510BT', unit: 'та',
        kirim: group(40, 52000000, 0),
        returnIn: group(2, 2600000, 3160000),
        sotuv: group(30, 39000000, 47700000),
        writeOff: group(2, 2600000, 0),
        returnOut: group(6, 7800000, 0),
      },
      {
        id: '7', name: 'Sony WH-CH520', sku: 'SNY-CH520', unit: 'та',
        kirim: group(18, 28800000, 0),
        returnIn: group(0, 0, 0),
        sotuv: group(13, 20800000, 25740000),
        writeOff: group(0, 0, 0),
        returnOut: group(5, 8000000, 0),
      },
    ];

    set({ rows: mockRows, isLoading: false });
  },

  updateCell: (id, groupKey, field, value) => {
    set((state) => ({
      rows: state.rows.map((row) =>
        row.id === id
          ? { ...row, [groupKey]: { ...row[groupKey], [field]: value } }
          : row
      ),
    }));
  },
}));
