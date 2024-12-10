import { graphql, HttpResponse } from "msw";
import { faker, fakerKO } from "@faker-js/faker";

const dummy = {
  images: Array.from({ length: 6 }, () =>
    faker.image.urlLoremFlickr({
      category: "nature",
      width: 152,
      height: 200,
    })
  ),
  userId: fakerKO.internet.username(),
  title: fakerKO.lorem.words(),
  contents: fakerKO.lorem.lines(10),
  addressCity: fakerKO.location.city(),
  addressTown: fakerKO.location.country(),
  address: `${fakerKO.location.state()} ${fakerKO.location.city()} ${fakerKO.location.street()} ${fakerKO.location.buildingNumber()}`,
  lat: 37.56682,
  lng: 126.97865,
};

const solplaceLogs = Array.from({ length: 30 }, (_, index) => {
  return {
    id: `${index + 1}`,
    ...dummy,
  };
});

const solplaceLog = Array.from({ length: 30 }, (_, index) => {
  return {
    id: `${index + 1}`,
    ...dummy,
  };
});

export const handlers = [
  graphql.query("fetchSolplaceLogs", ({ variables }) => {
    const page = variables.page || 1;

    return HttpResponse.json({
      data: {
        fetchSolplaceLogs: solplaceLogs.filter((_, index) => {
          if ((page - 1) * 10 <= index && index < page * 10) return true;
        }),
      },
    });
  }),
  graphql.query("fetchSolplaceLog", ({ variables }) => {
    const id = variables.id;

    const fetchSolplaceLog = solplaceLog.find(
      (solplaceLog) => solplaceLog.id === id
    );

    return HttpResponse.json({
      data: {
        fetchSolplaceLog: fetchSolplaceLog,
      },
    });
  }),
];
