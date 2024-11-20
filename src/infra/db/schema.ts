import { documentsRelations, documentsTable } from "./models/documents.model";
import { usersRelations, usersTable } from "./models/users.model";

export const schema = {
  tables: {
    users: usersTable,
    documents: documentsTable,
  },
  relations: {
    users: usersRelations,
    documents: documentsRelations,
  },
};
