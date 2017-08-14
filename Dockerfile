FROM nginx:1.11.10-alpine

RUN apk --update add nodejs

WORKDIR /root/maxbaun

COPY . .

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install && \
	npm run build

RUN mv dist /var/www

RUN rm -rf /root/maxbaun

COPY nginx.conf /etc/nginx/conf.d/default.conf
