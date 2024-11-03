# syntax=docker/dockerfile:1

ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-bookworm

ARG USERNAME=vscode

RUN groupmod -n ${USERNAME} node \
    && usermod -d /home/${USERNAME} -l ${USERNAME} -g ${USERNAME} node \
    && mkdir -p /home/${USERNAME} \
    && chown -R ${USERNAME}:${USERNAME} /home/${USERNAME} \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get update \
    && apt-get install -y sudo bash-completion git-flow \
    && echo ${USERNAME} ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/${USERNAME} \
    && chmod 0440 /etc/sudoers.d/${USERNAME} \
    && echo "if ! shopt -oq posix; then . /usr/share/bash-completion/bash_completion; fi" >> /etc/bash.bashrc

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

WORKDIR /home/${USERNAME}/workspaces/frontend

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER ${USERNAME}

COPY package.json package-lock.json ./
RUN sudo npm install

COPY ./ ./

EXPOSE 3000
