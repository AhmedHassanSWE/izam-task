export interface PaginationRoundedProps {
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}
