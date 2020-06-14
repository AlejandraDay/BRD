export const mockStore = {
  ///////////
  getters: {
    getItemList() {
      return [
        {
          user: 0,
          id: 1,
          name: "name1",
          category: "transfer",
          amount: "132",
          type: "income"
        },
        {
          user: 0,
          id: 2,
          name: "name2",
          category: "transfer",
          amount: "321",
          type: "income"
        },
        {
          user: 0,
          id: 3,
          name: "name3",
          category: "transfer",
          amount: "465",
          type: "expense"
        },
        {
          user: 0,
          id: 4,
          name: "name4",
          category: "transfer",
          amount: "5465",
          type: "expense"
        },
        {
          user: 0,
          id: 5,
          name: "name5",
          category: "other",
          amount: "654",
          type: "income"
        },
        {
          user: 0,
          id: 6,
          name: "name6",
          category: "other",
          amount: "465",
          type: "income"
        },
        {
          user: 0,
          id: 7,
          name: "name7",
          category: "other",
          amount: "564",
          type: "expense"
        },
        {
          user: 0,
          id: 8,
          name: "name8",
          category: "other",
          amount: "333",
          type: "expense"
        }
      ];
    }
  }
};

export const mockStoreFalse = {
  ///////////
  getters: {
    getItemList() {
      return [
        {
          user: 0,
          id: 5,
          name: "name5",
          category: "other",
          amount: "654",
          type: "income"
        },
        {
          user: 0,
          id: 6,
          name: "name6",
          category: "other",
          amount: "465",
          type: "income"
        },
        {
          user: 0,
          id: 7,
          name: "name7",
          category: "other",
          amount: "564",
          type: "expense"
        },
        {
          user: 0,
          id: 8,
          name: "name8",
          category: "other",
          amount: "333",
          type: "expense"
        }
      ];
    }
  }
};
