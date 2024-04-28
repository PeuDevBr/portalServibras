import {
  addRequisitionsAcess,
  getRequisitionsAcess,
  setRequisitionsAcess,
  updateRequisitionsAcess,
} from "../dataAcess/requisitionsAcess";

export async function addRequisitionsAction(body: any) {
  const response = await addRequisitionsAcess(body);

  return response?.id;
}

export async function setRequisitionsAction(body: any, id: string) {
  const response = await setRequisitionsAcess(body, id);

  return response;
}

export async function updateRequisitionsAction(body: any, id: string) {
  const response = await updateRequisitionsAcess(body, id);

  return response;
}

export async function getRequisitionsAction() {
  const response = await getRequisitionsAcess();
  const requisitions: any[] = [];

  response.forEach((doc) => {
    requisitions.push(doc.data())
  });

  return requisitions;
}
