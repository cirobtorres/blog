package com.cirobtorres.blog.api.client;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Client save(Client client) {
        return clientRepository.save(client);
    }

    public Optional<Client> findByClientId(String clientId) {
        return clientRepository.findByClientId(clientId);
    }
}
