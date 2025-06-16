use rh_plataforma

SELECT * FROM usuarios;

ALTER TABLE usuarios
ADD COLUMN idade INT,
ADD COLUMN funcao VARCHAR(255);

CREATE TABLE avisos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  descricao TEXT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

