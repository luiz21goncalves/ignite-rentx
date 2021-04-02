- Requisitos funcoinais => RF
- Requisitos não funcionais => RNF
- Regra de négocio => RN

# Cadastro de carro

**RF**
- [x] Deve ser possível cadastram um carro.

**RN**
- [x] Não deve ser possível cadastrar um carro com uma placa já existente.
- [x] O carro deve ser cadastrado com, por padrão como disponível.
- [x] Somente um administrador pode cadastrar um carro.

# Listagem de carros

**RF**
- [x] Deve ser possível listar todos os carros disponíveis.
- [x] Deve ser possível listar todos os carros disponíveis por categoria.
- [x] Deve ser possível listar todos os carros disponíveis por marca.
- [x] Deve ser possível listar todos os carros disponíveis por nome do carro.

**RN**
- [x] O usuário não precisa estar logado no sistema.


# Cadastro de especificação no caro

**RF**
- [x] Deve ser possível cadastrar uma especificação para um carro

**RNF**

**RN**
- [x] Não deve ser possível cadastrar uma especificação para um caro não cadastrado.
- [x] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- [x] Somente um administrador pode cadastrar uma especificação.

# Cadastro de imagens do carro

**RF**
- [ ] Deve ser possível cadastrar a imagem do carro
- [ ] Deve ser possível listar todos os carros.

**RN**
- [ ] Utilizar o `multer` para upload dos arquivos

**RN**
- [ ] Não deve ser possível cadastrar uma imagem para um carro não cadastrado.
- [ ] O usuário deve cadastrar mais de uma imagem parar o mesmo carro.
- [ ] Somente um administrador pode cadastrar images para os carros.


# Alugel de carro

**RF**
- [ ] Deve ser possível cadastrar um alugel.

**RN**
- [ ] O alugel deve ter duração mínima de 24 hora.
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
