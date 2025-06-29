export type BoardIdParmas={
    boardId:string;
}

export type ColumnIdParmas= BoardIdParmas &{
    columnId:string;
}

export type CardIdParams= ColumnIdParmas &{
    cardId:string;
}