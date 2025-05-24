# module install
FROM node:18.16-alpine as installer
# set working directory
RUN mkdir -p /usr/admin
WORKDIR /usr/admin
COPY src/package.json /usr/admin/
COPY src/yarn.lock /usr/admin/
#RUN ls -laht /usr/admin
RUN ls -laht
#RUN yarn install
COPY src/ /usr/admin/
RUN yarn install
#RUN ls -laht
RUN yarn build


FROM node:18.16-alpine AS final
RUN apk add --no-cache tzdata

COPY --from=installer /usr/admin/.output /app
WORKDIR /app
EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
CMD [ "node", "./server/index.mjs" ]
