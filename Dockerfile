FROM centos/nodejs-8-centos7

ENV PATH=${PATH}:/opt/rh/rh-nodejs8/root/usr/bin

COPY . .

RUN npm install

CMD /usr/libexec/s2i/run
