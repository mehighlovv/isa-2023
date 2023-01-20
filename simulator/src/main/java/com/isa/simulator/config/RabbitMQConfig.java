package com.isa.simulator.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    @Value("${rabbitmq.simulation_queue.name}")
    private String simulationQueue;
    @Value("${rabbitmq.location_queue.name}")
    private String queue;
    @Value("${rabbitmq.location_exchange.name}")
    private String exchange;
    @Value("${rabbitmq.location_routing.key}")
    private String routingKey;
    @Autowired
    private ConnectionFactory rabbitConnectionFactory;

    @Bean
    public Queue simulationQueue() {
        return new Queue(simulationQueue);
    }
    
    @Bean
    public Queue queue() {
        return new Queue(queue);
    }

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(exchange);
    }

    @Bean
    public Binding binding() {
        return BindingBuilder
            .bind(queue())
            .to(exchange())
            .with(routingKey);
    }

    @Bean
    public RabbitTemplate rabbitTemplate() {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(rabbitConnectionFactory);
        return rabbitTemplate;
    }
}