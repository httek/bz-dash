export interface Menu {
  id: number;
  name: string;
  path: string | null;
  title: string;
  type: number;
  auth: number;
  icon: string;
  child: Menu[];
  relation: string[];
  sequence: number | null;
  component: string | null;
}
