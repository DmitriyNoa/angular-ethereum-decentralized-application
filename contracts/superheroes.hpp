#include <eosiolib/eosio.hpp>

using namespace std;
using namespace eosio;
class [[eosio::contract]] superheroes : public eosio::contract {

 private:

    struct superhero {
      uint8_t id;
      name name;
      name category;
      name avatar;
      string description;
    };

}
