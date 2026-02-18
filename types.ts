
export interface PhotoNode {
  id: string;
  url: string;
  label?: string;
}

export interface TreeItem {
  name: string;
  children?: TreeItem[];
  type: 'folder' | 'file';
}

export interface HashPair {
  key: string;
  value: string; // url
}
