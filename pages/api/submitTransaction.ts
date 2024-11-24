import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const data = {
    sender: "0x88fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1",
    sequence_number: "32425224034",
    max_gas_amount: "32425224034",
    gas_unit_price: "32425224034",
    expiration_timestamp_secs: "32425224034",
    payload: {
      type: "entry_function_payload",
      function: "0x1::aptos_coin::transfer",
      type_arguments: ["string"],
      arguments: [null]
    },
    signature: {
      type: "ed25519_signature",
      public_key: "0x88fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1",
      signature: "0x88fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1"
    }
  }

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://aptos.testnet.suzuka.movementlabs.xyz/v1/transactions',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: JSON.stringify(data)
  }

  try {
    const response = await axios.request(config)
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}