FROM public.ecr.aws/amazonlinux/amazonlinux:latest

RUN yum install -y nodejs
RUN yum install -y git
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
RUN yum install -y -v yarn

WORKDIR /beat-sheet-api

COPY . .

RUN yarn install

RUN yarn build

CMD [ "yarn", "start"]
